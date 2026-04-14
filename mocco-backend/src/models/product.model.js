import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name!"],
        },
        description: {
            type: String,
            required: [true, "Please enter product description!"],
        },
        category: {
            type: String,
            required: [true, "Please enter product category!"],
        },
        tags: {
            type: [String],
            required: [true, "Please enter product tags!"],
        },
        stock: {
            type: Number,
            required: [true, "Please enter product stock!"],
        },
        price: {
            type: Number,
            required: [true, "Please enter product price!"],

        },
        discount_price: {
            type: Number,
        },
        images: [
            {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
        total_sell: {
            type: Number,
            default: 0,
        },
        sold_out: {
            type: Number,
            default: 0,
        },
        shop: {
            type: Schema.Types.ObjectId,
            ref: "Shop",
            required: true,
        },
        // extra
        // shopId: {
        //     type: String,
        //     required: true,
        // },
        // shop: {
        //     type: Object,
        //     required: true,
        // }
    }, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;