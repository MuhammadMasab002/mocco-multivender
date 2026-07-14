import express from "express";
import { createOrder } from "../controllers/order.controller.js";
import isUserAuthenticated from "../middlewares/userAuth.js";


const orderRouter = express.Router();

orderRouter.use(isUserAuthenticated);
orderRouter.post("/create-order", createOrder);

export default orderRouter;
