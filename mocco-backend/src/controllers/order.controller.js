import catchAsyncErrors from "../middlewares/CatchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";


// create new order (grouped by seller for multi-vendor support)
const createOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const { orderItems, shippingAddress, paymentInfo, totalAmount } = req.body;

        // Validate required fields
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
                // Calculate per-seller subtotal
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


export { createOrder };