import mongoose, { Schema } from "mongoose";

const refundSchema = new Schema(
    {
        order: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        shop: {
            type: Schema.Types.ObjectId,
            ref: "Shop",
        },
        reason: {
            type: String,
            required: [true, "Refund reason is required!"],
        },
        status: {
            type: String,
            enum: ["Processing", "Approved", "Rejected"],
            default: "Processing",
        },
        totalAmount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Refund = mongoose.model("Refund", refundSchema);

export default Refund;
