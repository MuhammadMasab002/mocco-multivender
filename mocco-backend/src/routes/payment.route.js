import express from "express";
import { PaymentProcess, SendStripeKey } from "../controllers/payment.controller.js";


const paymentRouter = express.Router();

paymentRouter.post("/process", PaymentProcess);
paymentRouter.get("/stripe-api-key", SendStripeKey);

export default paymentRouter;
