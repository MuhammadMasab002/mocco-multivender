import jwt from "jsonwebtoken";

// create activation token for both user and shop
export const createActivationToken = (payload) => {
    const activationSecret =
        process.env.ACTIVATION_TOKEN_SECRET_KEY || process.env.JWT_SECRET_KEY;

    const activationExpiry = process.env.EXPIRES_ACTIVATION_TOKEN || "5m";

    return jwt.sign(payload, activationSecret, {
        expiresIn: activationExpiry,
    });
};