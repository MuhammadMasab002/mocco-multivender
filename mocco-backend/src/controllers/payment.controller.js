import catchAsyncErrors from "../middlewares/CatchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Stripe from "stripe";

// process payment
const PaymentProcess = catchAsyncErrors(async (req, res, next) => {
    try {
        const amount = req.body.amount;

        const paymentIntent = await Stripe(process.env.STRIPE_API_KEY).paymentIntents.create({
            amount: amount,
            currency: "inr",
            metadata: {
                company: "Mocco",
                integration_check: "accept_a_payment",
            },
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error("Error in PaymentProcess:", error);
        return next(
            new ErrorHandler("Failed to process payment! " + error.message, 500),
        );
    }
})

// send stripe key
const SendStripeKey = catchAsyncErrors(async (req, res, next) => {
    try {
        res.status(200).json({
            stripeKey: process.env.STRIPE_API_KEY
        });
    } catch (error) {
        console.error("Error in SendStripeKey:", error);
        return next(
            new ErrorHandler("Failed to send Stripe key! " + error.message, 500),
        );
    }
})


export { PaymentProcess, SendStripeKey };