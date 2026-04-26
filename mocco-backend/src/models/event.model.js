import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter event product name!"],
        },
        description: {
            type: String,
            required: [true, "Please enter event product description!"],
        },
        category: {
            type: String,
            required: [true, "Please enter event product category!"],
        },
        start_Date: {
            type: Date,
            required: true,
        },
        Finish_Date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            default: "Running",
        },
        tags: {
            type: [String],
            required: [true, "Please enter event product tags!"],
        },
        stock: {
            type: Number,
            required: [true, "Please enter event product stock!"],
        },
        price: {
            type: Number,
            required: [true, "Please enter event product price!"],

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

const Event = mongoose.model("Event", eventSchema);

export default Event;