import express from "express";
import { createCoupon, deleteCoupon, getCoupons, validateCoupon } from "../controllers/coupon.controller.js";
import isSellerAuthenticated from "../middlewares/sellerAuth.js";
import isUserAuthenticated from "../middlewares/userAuth.js";

const couponRouter = express.Router();

couponRouter.post("/create", isSellerAuthenticated, createCoupon);
couponRouter.get("/all/:shopId", getCoupons);
couponRouter.delete("/delete/:id", isSellerAuthenticated, deleteCoupon);

// Checkout coupon validation — authenticated user only
// couponRouter.get("/validate/:couponCode", isUserAuthenticated, validateCoupon);
couponRouter.post("/validate", isUserAuthenticated, validateCoupon);

export default couponRouter;
