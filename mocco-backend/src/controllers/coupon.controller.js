import catchAsyncErrors from "../middlewares/CatchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Coupon from "../models/coupon.model.js";


// create coupon
const createCoupon = catchAsyncErrors(async (req, res, next) => {
    try {
        const { code, discount, minAmount, maxAmount, productId, categoryId } = req.body;

        // Validate input
        if (!code || !discount || !productId || !categoryId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields (code, discount, product, category)",
            });
        }

        const couponExists = await Coupon.findOne({ code });

        if (couponExists) {
            return res.status(400).json({
                success: false,
                message: "Coupon code already exists",
            });
        }

        const coupon = await Coupon.create({
            code,
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

export { createCoupon, getCoupons, deleteCoupon };