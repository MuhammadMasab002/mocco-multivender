import User from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";

const isUserAuthenticated = async (req, res, next) => {
    try {
        const { user_token } = req.cookies;

        if (!user_token) {
            return next(new ErrorHandler("Unauthorized! No token provided.", 401));
        }

        const decoded = jwt.verify(user_token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return next(new ErrorHandler("Unauthorized! User not found.", 401));
        }

        next();
    } catch (error) {
        console.error("Error in isUserAuthenticated middleware:", error);
        return next(new ErrorHandler("Unauthorized! Invalid token.", 401));
    }
};

export default isUserAuthenticated;