import express from "express";
import {
    createOrder,
    getMyOrders,
    getShopOrders,
    updateOrderStatus,
} from "../controllers/order.controller.js";
import isUserAuthenticated from "../middlewares/userAuth.js";
import isSellerAuthenticated from "../middlewares/sellerAuth.js";


const orderRouter = express.Router();

// User routes (require user auth)
orderRouter.post("/create-order", isUserAuthenticated, createOrder);
orderRouter.get("/my-orders", isUserAuthenticated, getMyOrders);

// Seller routes (require seller auth)
orderRouter.get("/shop-orders", isSellerAuthenticated, getShopOrders);
orderRouter.patch("/:id/status", isSellerAuthenticated, updateOrderStatus);

export default orderRouter;
