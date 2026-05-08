import mongoose, { Schema } from "mongoose";


const couponSchema = new Schema({
    code: {
        type: String,
        required: [true, "Please enter coupon code!"],
        unique: true,
    },
    value: {
        type: Number,
        required: [true, "Please enter coupon value!"],
    },
    minAmount: {
        type: Number,
        // required: [true, "Please enter minimum amount!"],
    },
    maxAmount: {
        type: Number,
        // required: [true, "Please enter maximum amount!"],
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    category: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Category",
        // required: [true, "Please enter category name!"],
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
    },
}, { timestamps: true });

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;