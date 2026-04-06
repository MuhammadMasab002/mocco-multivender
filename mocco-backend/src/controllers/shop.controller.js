import Shop from "../models/shop.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { createActivationToken } from "../utils/createToken.js";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/jwtToken.js";
import jwt from "jsonwebtoken";

// shop create 
const registerShop = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            phoneNumber,
            description,
            addresses: addressesFromBody,
            address,
            zipCode,
        } = req.body || {};

        const addresses = addressesFromBody || address;

        if (!name || !email || !password || !phoneNumber || !addresses || !zipCode) {
            return res
                .status(400)
                .json({ success: false, message: "Please enter all fields!" });
        }

        // Check if shop already exists
        const existingShop = await Shop.findOne({ email });
        if (existingShop) {
            return next(new ErrorHandler("Shop already exists!", 400));
        }

        // Handle avatar upload
        const fileName = req.file?.filename;

        // Create shop object
        const shop = {
            name,
            email,
            password,
            phoneNumber,
            description,
            addresses,
            zipCode,
            avatar: {
                public_id: fileName || "default-avatar",
                url: fileName
                    ? `/uploads/${fileName}`
                    : "https://dummyimage.com/200x200/e2e8f0/64748b.png&text=Shop",
            },
        };

        // create activation token
        const activationToken = createActivationToken(shop);
        const activationUrl = `${process.env.FRONTEND_URL}/seller/activate/${activationToken}`;

        // Send activation email
        try {
            await sendMail({
                email: shop.email,
                subject: "Activate Your Mocco Shop Account",
                message: `Hello ${shop.name},\n\nPlease click the following link to activate your shop:\n\n${activationUrl}\n\nIf you did not create this account, please ignore this email.\n\nBest regards,\nMocco Team`,
            });
            // response to frontend
            res.status(201).json({
                success: true,
                message: `Registration successful! Please check your email:- ${shop.email} first, to activate your shop.`,
            });
        } catch (error) {
            console.error("Error sending activation email:", error);
            return next(
                new ErrorHandler(
                    "Failed to send activation email! " + error.message,
                    500,
                ),
            );
        }

        // Create new shop
    } catch (error) {
        console.error("Error in registerShop:", error);
        return next(
            new ErrorHandler(
                "Failed to create shop! " + error.message,
                500,
            ),
        );
    }
}

// activate shop account
const activateShopEmail = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token) {
            return next(new ErrorHandler("Activation token is required!", 400));
        }

        const activationSecret =
            process.env.ACTIVATION_TOKEN_SECRET_KEY || process.env.JWT_SECRET_KEY;

        const decodedToken = jwt.verify(token, activationSecret);

        const existingShop = await Shop.findOne({ email: decodedToken.email });

        if (existingShop) {
            return next(new ErrorHandler("Shop already activated!", 400));
        }

        const createdShop = await Shop.create({
            name: decodedToken.name,
            email: decodedToken.email,
            password: decodedToken.password,
            avatar: decodedToken.avatar,
            phoneNumber: decodedToken.phoneNumber,
            description: decodedToken.description,
            addresses: decodedToken.addresses,
            zipCode: decodedToken.zipCode,
        });

        sendToken(createdShop, 201, res);
    } catch (error) {
        console.error("Error in activateShopEmail:", error);
        return next(
            new ErrorHandler(
                "Failed to activate shop account! " + error.message,
                500,
            ),
        );
    }
};


export { registerShop, activateShopEmail };