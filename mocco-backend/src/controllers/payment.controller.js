import catchAsyncErrors from "../middlewares/CatchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Stripe from "stripe";

// process payment — creates a PaymentIntent and returns the client_secret
const PaymentProcess = catchAsyncErrors(async (req, res, next) => {
    try {
        const amount = req.body.amount;

        if (!amount || isNaN(amount) || amount <= 0) {
            return next(new ErrorHandler("Invalid payment amount.", 400));
        }

        // Initialize Stripe with the secret key from environment variables
        // inside the function to ensure it's available in serverless environments
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            metadata: {
                company: "Mocco",
                integration_check: "accept_a_payment",
            },
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,   // camelCase — consistent with Stripe JS SDK naming
        });
    } catch (error) {
        console.error("Error in PaymentProcess:", error);
        return next(new ErrorHandler("Failed to process payment! " + error.message, 500));
    }
});

// send publishable (frontend) stripe key
const SendStripeKey = catchAsyncErrors(async (req, res, next) => {
    try {
        // STRIPE_API_KEY holds the publishable key (pk_test_...)
        const publishableKey = process.env.STRIPE_API_KEY;
        if (!publishableKey) {
            return next(new ErrorHandler("Stripe publishable key is not configured.", 500));
        }
        res.status(200).json({
            stripeKey: publishableKey,
        });
    } catch (error) {
        console.error("Error in SendStripeKey:", error);
        return next(new ErrorHandler("Failed to send Stripe key! " + error.message, 500));
    }
});


export { PaymentProcess, SendStripeKey };