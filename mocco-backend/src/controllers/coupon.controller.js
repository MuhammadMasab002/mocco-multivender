import catchAsyncErrors from "../middlewares/CatchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Coupon from "../models/coupon.model.js";


// create coupon
const createCoupon = catchAsyncErrors(async (req, res, next) => {
    try {
        const { code, discount, minAmount, maxAmount, productId, categoryId } = req.body;
        const normalizedCode = code?.trim().toLowerCase();

        // Validate input
        if (!normalizedCode || !discount || !productId || !categoryId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields (code, discount, product, category)",
            });
        }

        if (minAmount != null && maxAmount != null && Number(minAmount) > Number(maxAmount)) {
            return res.status(400).json({
                success: false,
                message: "Minimum amount cannot be greater than maximum amount",
            });
        }

        const couponExists = await Coupon.findOne({ code: normalizedCode });

        if (couponExists) {
            return res.status(400).json({
                success: false,
                message: "Coupon code already exists",
            });
        }

        const coupon = await Coupon.create({
            code: normalizedCode,
            value: discount,
            minAmount,
            maxAmount,
            product: productId,
            category: categoryId,
            shop: req.seller._id, // associate coupon with the authenticated seller's shop
            // expiryDate,
        });

        return res.status(201).json({
            success: true,
            message: "Coupon created successfully",
            coupon,
        });

    } catch (error) {
        console.error("Error in createCoupon:", error);
        return next(
            new ErrorHandler("Failed to create coupon! " + error.message, 500)
        );
    }
});

// get coupons
const getCoupons = catchAsyncErrors(async (req, res, next) => {
    try {
        const shopId = req.params.shopId;

        const coupons = await Coupon.find({ shop: shopId });

        return res.status(200).json({
            success: true,
            coupons,
        });
    } catch (error) {
        console.error("Error in getCoupons:", error);
        return next(
            new ErrorHandler("Failed to fetch coupons! " + error.message, 500)
        );
    }
});

// delete coupon by id
const deleteCoupon = catchAsyncErrors(async (req, res, next) => {
    try {
        const couponId = req.params.id;

        const coupon = await Coupon.findByIdAndDelete(couponId);

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Coupon deleted successfully",
        });
    } catch (error) {
        console.error("Error in deleteCoupon:", error);
        return next(
            new ErrorHandler("Failed to delete coupon! " + error.message, 500)
        );
    }
});

// validate coupon code at checkout — returns discount value and type
const validateCoupon = catchAsyncErrors(async (req, res, next) => {
    try {
        const code = (req.body?.couponCode || req.params.couponCode || "").trim().toLowerCase();
        const cartItems = Array.isArray(req.body?.cartItems) ? req.body.cartItems : [];

        if (!code) {
            return next(new ErrorHandler("Please provide a coupon code", 400));
        }

        const coupon = await Coupon.findOne({ code })
            .populate("product", "name")
            .populate("shop", "name");

        if (!coupon) {
            return next(new ErrorHandler("Invalid coupon code", 404));
        }

        const eligibleItems = cartItems.filter(
            (item) => item?.productId?.shop?._id?.toString() === coupon?.shop?._id?.toString()
        );

        const eligibleSubtotal = eligibleItems.reduce((total, item) => {
            const price = item?.productId?.discount_price || item?.productId?.price || 0;
            return total + price * (item?.quantity || 0);
        }, 0);

        if (coupon.minAmount != null && eligibleSubtotal < coupon.minAmount) {
            return next(
                new ErrorHandler(
                    `Coupon is valid only for orders above $${coupon.minAmount}`,
                    400
                )
            );
        }

        if (coupon.maxAmount != null && eligibleSubtotal > coupon.maxAmount) {
            return next(
                new ErrorHandler(
                    `Coupon is valid only for orders up to $${coupon.maxAmount}`,
                    400
                )
            );
        }

        return res.status(200).json({
            success: true,
            message: "Coupon validated successfully",
            coupon,
            eligibleSubtotal,
        });
    } catch (error) {
        console.error("Error in validateCoupon:", error);
        return next(new ErrorHandler("Failed to validate coupon! " + error.message, 500));
    }
});

export { createCoupon, getCoupons, deleteCoupon, validateCoupon };
