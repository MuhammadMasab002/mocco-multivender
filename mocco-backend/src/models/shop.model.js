import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const shopSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your shop name!"],
        },
        email: {
            type: String,
            required: [true, "Please enter your shop email!"],
        },
        password: {
            type: String,
            required: [true, "Please enter your shop password"],
            minLength: [4, "Password should be greater than 4 characters"],
            select: false,
        },
        phoneNumber: {
            type: Number,
            required: [true, "Please enter your shop phone number!"],
        },
        description: {
            type: String,
        },
        addresses: {
            type: String,
            required: [true, "Please enter your shop addresses!"],
        },
        role: {
            type: String,
            default: "Seller",
        },
        avatar: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
        zipCode: {
            type: Number,
            required: [true, "Please enter your shop zip code!"],
        },
        resetPasswordToken: String,
        resetPasswordTime: Date,
    },
    { timestamps: true },
);

//  Hash password
shopSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
shopSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

// compare password
shopSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
