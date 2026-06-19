import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required!"],
            index: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product ID is required!"],
            index: true,
        },
    },
    { timestamps: true }
);

// Compound unique index — prevents duplicate wishlist entries
wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
