import catchAsyncErrors from "../middlewares/CatchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

// ─── Valid status transitions (seller can only move forward, or cancel/return) ───
const VALID_TRANSITIONS = {
    "Processing": ["Ready for Pickup", "Shipped", "Cancelled"],
    "Ready for Pickup": ["Shipped", "Out for Delivery", "Cancelled"],
    "Shipped": ["Out for Delivery", "Delivered", "Cancelled"],
    "Out for Delivery": ["Delivered", "Cancelled"],
    "Delivered": ["Returned"],
    "Pending Payment": ["Processing", "Cancelled"],
    "Cancelled": [],
    "Returned": [],
};


// ────────────────────────────────────────────────────────────────────────────────
// POST /api/v1/order/create-order (user auth)
// ────────────────────────────────────────────────────────────────────────────────
const createOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const { orderItems, shippingAddress, paymentInfo, totalAmount } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return next(new ErrorHandler("No order items provided.", 400));
        }
        if (!shippingAddress) {
            return next(new ErrorHandler("Shipping address is required.", 400));
        }
        if (!paymentInfo?.method) {
            return next(new ErrorHandler("Payment information is required.", 400));
        }

        // Group items by seller for multi-vendor order splitting
        const groupedItems = orderItems.reduce((acc, item) => {
            const sellerId = item?.sellerId?.toString();
            if (!sellerId) return acc;
            if (!acc[sellerId]) acc[sellerId] = [];
            acc[sellerId].push(item);
            return acc;
        }, {});

        const userId = req.user._id;

        const orders = await Promise.all(
            Object.entries(groupedItems).map(async ([sellerId, items]) => {
                const sellerTotal = items.reduce(
                    (sum, item) => sum + (item.price || 0) * item.quantity,
                    0
                );

                const order = await Order.create({
                    user: userId,
                    items,
                    shippingAddress,
                    paymentInfo: {
                        transactionId: paymentInfo.transactionId || null,
                        method: paymentInfo.method,
                        paymentStatus: paymentInfo.paymentStatus || "Unpaid",
                    },
                    totalAmount: sellerTotal,
                    paidAt: paymentInfo.paymentStatus === "Paid" ? Date.now() : undefined,
                });

                return order;
            })
        );

        // Clear the user's cart after successful order creation
        await Cart.findOneAndUpdate({ userId }, { items: [] });

        res.status(201).json({
            success: true,
            orders,
            message: `${orders.length} order(s) created successfully.`,
        });
    } catch (error) {
        console.error("Error in createOrder:", error);
        return next(new ErrorHandler("Failed to create order! " + error.message, 500));
    }
});


// ────────────────────────────────────────────────────────────────────────────────
// GET /api/v1/order/my-orders (user auth)
// Returns all orders belonging to the logged-in user, most recent first
// ────────────────────────────────────────────────────────────────────────────────
const getMyOrders = catchAsyncErrors(async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate("items.productId", "name images price discount_price shop")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error("Error in getMyOrders:", error);
        return next(new ErrorHandler("Failed to fetch orders! " + error.message, 500));
    }
});


// ────────────────────────────────────────────────────────────────────────────────
// GET /api/v1/order/shop-orders (seller auth)
// Returns all orders that contain at least one product belonging to the logged-in shop
// ────────────────────────────────────────────────────────────────────────────────
const getShopOrders = catchAsyncErrors(async (req, res, next) => {
    try {
        const sellerId = req.seller._id.toString();

        // Find orders where any item's productId is owned by this shop
        const orders = await Order.find()
            .populate("items.productId", "name images price discount_price shop")
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        // Filter to only orders that have at least one item belonging to this seller's shop
        const shopOrders = orders.filter(order =>
            order.items.some(item => {
                const itemShop = item.productId?.shop?.toString();
                return itemShop === sellerId;
            })
        );

        res.status(200).json({
            success: true,
            orders: shopOrders,
        });
    } catch (error) {
        console.error("Error in getShopOrders:", error);
        return next(new ErrorHandler("Failed to fetch shop orders! " + error.message, 500));
    }
});


// ────────────────────────────────────────────────────────────────────────────────
// PATCH /api/v1/order/:id/status (seller auth)
// Updates status with transition validation and sets deliveredAt when delivered
// ────────────────────────────────────────────────────────────────────────────────
const updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    try {
        const { status } = req.body;
        const orderId = req.params.id;

        if (!status) {
            return next(new ErrorHandler("Status is required.", 400));
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return next(new ErrorHandler("Order not found.", 404));
        }

        const currentStatus = order.status;

        // Validate transition
        const allowedNext = VALID_TRANSITIONS[currentStatus] || [];
        if (!allowedNext.includes(status)) {
            return next(
                new ErrorHandler(
                    `Cannot transition order from "${currentStatus}" to "${status}". Allowed: ${allowedNext.join(", ") || "none"}.`,
                    400
                )
            );
        }

        // Optionally set deliveredAt timestamp
        if (status === "Delivered") {
            order.deliveredAt = Date.now();
        }

        order.status = status;
        await order.save();

        await order.populate("user", "name email");
        await order.populate("items.productId", "name images price discount_price shop");

        res.status(200).json({
            success: true,
            order,
            message: `Order status updated to "${status}".`,
        });
    } catch (error) {
        console.error("Error in updateOrderStatus:", error);
        return next(new ErrorHandler("Failed to update order status! " + error.message, 500));
    }
});


export { createOrder, getMyOrders, getShopOrders, updateOrderStatus };