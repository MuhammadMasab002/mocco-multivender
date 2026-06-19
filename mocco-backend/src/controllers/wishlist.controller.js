import catchAsyncErrors from "../middlewares/CatchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Wishlist from "../models/wishlist.model.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

// Add product to wishlist
export const addToWishlist = catchAsyncErrors(async (req, res, next) => {
    const { productId } = req.body;
    const userId = req.user._id;

    if (!productId) {
        return next(new ErrorHandler("Product ID is required", 400));
    }

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    // Upsert to prevent duplicate entries efficiently
    const wishlistItem = await Wishlist.findOneAndUpdate(
        { userId, productId },
        { userId, productId },
        { upsert: true, new: true }
    ).populate({
        path: "productId",
        populate: { path: "shop", select: "name avatar" }
    });

    res.status(200).json({
        success: true,
        message: "Added to wishlist",
        wishlistItem,
    });
});

// Remove product from wishlist
export const removeFromWishlist = catchAsyncErrors(async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user._id;

    if (!productId) {
        return next(new ErrorHandler("Product ID is required", 400));
    }

    const result = await Wishlist.findOneAndDelete({ userId, productId });

    if (!result) {
        return next(new ErrorHandler("Product not found in wishlist", 404));
    }

    res.status(200).json({
        success: true,
        message: "Removed from wishlist",
    });
});

// Get user's wishlist
export const getWishlist = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;

    const wishlist = await Wishlist.find({ userId })
        .populate({
            path: "productId",
            populate: { path: "shop", select: "name avatar" }
        })
        .sort({ createdAt: -1 });

    // Filter out items where the product might have been deleted from the database
    const validWishlist = wishlist.filter(item => item.productId !== null);

    res.status(200).json({
        success: true,
        wishlist: validWishlist,
    });
});

// Clear entire wishlist
export const clearWishlist = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;

    await Wishlist.deleteMany({ userId });

    res.status(200).json({
        success: true,
        message: "Wishlist cleared",
    });
});

// Merge guest wishlist (from localStorage) into user's wishlist
export const mergeWishlist = catchAsyncErrors(async (req, res, next) => {
    const { productIds } = req.body;
    const userId = req.user._id;

    if (!Array.isArray(productIds) || productIds.length === 0) {
        return res.status(200).json({ success: true, message: "Nothing to merge" });
    }

    // Filter to valid object IDs
    const validIds = productIds.filter(id => mongoose.Types.ObjectId.isValid(id));

    if (validIds.length === 0) {
        return res.status(200).json({ success: true, message: "No valid products to merge" });
    }

    // Ensure products actually exist
    const existingProducts = await Product.find({ _id: { $in: validIds } }).select("_id");
    const existingProductIds = existingProducts.map(p => p._id.toString());

    if (existingProductIds.length === 0) {
        return res.status(200).json({ success: true, message: "No matching products found to merge" });
    }

    const operations = existingProductIds.map(productId => ({
        updateOne: {
            filter: { userId, productId },
            update: { $set: { userId, productId } },
            upsert: true
        }
    }));

    try {
        await Wishlist.bulkWrite(operations, { ordered: false });
    } catch (error) {
        console.error("Merge partial error (likely harmless duplicates):", error);
    }

    res.status(200).json({
        success: true,
        message: "Wishlist merged successfully",
    });
});
