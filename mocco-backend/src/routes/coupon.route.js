import express from "express";
import { createCoupon, deleteCoupon, getCoupons } from "../controllers/coupon.controller.js";
import isSellerAuthenticated from "../middlewares/sellerAuth.js";

const couponRouter = express.Router();

couponRouter.post(
    "/create",
    isSellerAuthenticated,
    createCoupon,
);
// couponRouter.get("/all", getShopCoupons);
couponRouter.get("/all/:shopId", getCoupons);
couponRouter.delete("/delete/:id", isSellerAuthenticated, deleteCoupon);

export default couponRouter;