import express from "express";
import { PaymentProcess, SendStripeKey } from "../controllers/payment.controller.js";


const paymentRouter = express.Router();

// paymentRouter.use(isUserAuthenticated);

paymentRouter.post("/process", PaymentProcess);
paymentRouter.get("/key", SendStripeKey);

export default paymentRouter;
