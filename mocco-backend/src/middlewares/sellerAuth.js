import Shop from "../models/shop.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";

const isSellerAuthenticated = async (req, res, next) => {
    try {
        const { seller_token } = req.cookies;

        if (!seller_token) {
            return next(new ErrorHandler("Unauthorized! No token provided.", 401));
        }

        const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
        req.user = await Shop.findById(decoded.id).select("-password");

        if (!req.user) {
            return next(new ErrorHandler("Unauthorized! Seller not found.", 401));
        }

        next();
    } catch (error) {
        console.error("Error in isSellerAuthenticated middleware:", error);
        return next(new ErrorHandler("Unauthorized! Invalid token.", 401));
    }
};

export default isSellerAuthenticated;