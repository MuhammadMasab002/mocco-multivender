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

export { createCoupon };