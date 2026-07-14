import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Wallet,
  Banknote,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import {
  setPaymentMethod,
  resetCheckout,
} from "../services/store/slices/checkoutSlice";
import { clearCart } from "../services/store/actions/cart";
import CustomFormInput from "../components/common/inputs/CustomFormInput";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { backendUrl } from "../components/myShop/utils";
import axios from "axios";

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Debit / Credit Card",
    description: "Pay securely with your bank card",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    id: "paypal",
    label: "PayPal",
    description: "Pay using your PayPal account",
    icon: <Wallet className="w-5 h-5" />,
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay with cash when your order arrives",
    icon: <Banknote className="w-5 h-5" />,
  },
];

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useSelector((state) => state.user);
  const { paymentMethod, total, selectedAddressId } = useSelector(
    (state) => state.checkout,
  );
  const { cartItems } = useSelector((state) => state.cart);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState("");
  const [cardName, setCardName] = useState(user?.name || "");

  // Stripe validation state
  const [stripeComplete, setStripeComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });

  const isStripeFormComplete =
    stripeComplete.cardNumber &&
    stripeComplete.cardExpiry &&
    stripeComplete.cardCvc;

  const handleStripeChange = (e, field) => {
    setStripeComplete((prev) => ({
      ...prev,
      [field]: e.complete,
    }));
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    // 1. Validations
    if (!selectedAddressId) {
      toast.error(
        "Shipping address is missing. Please go back and select an address.",
      );
      return;
    }

    if (cartItems?.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (paymentMethod === "card") {
      if (!isStripeFormComplete || !cardName) {
        toast.error("Please fill in all card details correctly.");
        return;
      }
    } else if (paymentMethod === "paypal") {
      if (!paypalEmail) {
        toast.error("Please enter your PayPal email address.");
        return;
      }
    }

    setIsPlacingOrder(true);

    try {
      // 2. Prepare Order Data
      const selectedAddress = user?.addresses?.find(
        (addr) => addr._id?.toString() === selectedAddressId?.toString(),
      );

      if (!selectedAddress) {
        setIsPlacingOrder(false);
        return toast.error(
          "Selected shipping address not found. Please go back and re-select your address.",
        );
      }

      const orderItems = cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.discount_price || item.productId.price,
        sellerId: item.productId.shop?._id || item.productId.shop,
      }));

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      let paymentInfo = {};

      // 3. Process Payment based on selected method
      if (paymentMethod === "card") {
        const { data: processData } = await axios.post(
          `${backendUrl}/payment/process`,
          { amount: Math.round(total * 100) },
          config,
        );

        if (!stripe || !elements) {
          setIsPlacingOrder(false);
          return toast.error("Stripe is not initialized.");
        }

        const result = await stripe.confirmCardPayment(
          processData.clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardNumberElement),
              billing_details: {
                name: cardName,
                email: user?.email,
              },
            },
          },
        );

        if (result.error) {
          setIsPlacingOrder(false);
          return toast.error(result.error.message);
        }

        if (result.paymentIntent.status === "succeeded") {
          paymentInfo = {
            transactionId: result.paymentIntent.id,
            method: "Credit Card",
            paymentStatus: "Paid",
          };
        } else {
          setIsPlacingOrder(false);
          return toast.error("Payment processing failed. Please try again.");
        }
      } else if (paymentMethod === "paypal") {
        // Mock PayPal Processing
        paymentInfo = {
          transactionId: "mock_paypal_" + Date.now(),
          method: "PayPal",
          paymentStatus: "Paid",
        };
      } else if (paymentMethod === "cod") {
        paymentInfo = {
          method: "Cash on Delivery",
          paymentStatus: "Unpaid",
        };
      }

      // 4. Create Order
      const orderPayload = {
        orderItems,
        shippingAddress: selectedAddress,
        paymentInfo,
        totalAmount: total,
      };

      const { data: orderData } = await axios.post(
        `${backendUrl}/order/create-order`,
        orderPayload,
        config,
      );

      if (orderData.success) {
        toast.success("Order placed successfully!");

        // Extract grouped order IDs
        const orderIds = orderData.orders?.map((o) => o._id).join(",") || "";

        // 5. Cleanup and redirect
        await dispatch(clearCart());
        dispatch(resetCheckout());

        navigate(`/order/success?orderIds=${orderIds}`);
      } else {
        toast.error("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "An error occurred during checkout.",
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-1">
          Payment Method
        </h2>
        <p className="text-sm text-gray-500">
          All transactions are secure and encrypted.
        </p>
      </div>

      <div className="space-y-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = paymentMethod === method.id;
          return (
            <div
              key={method.id}
              className={`
                w-full text-left rounded-xl border-2 transition-all duration-200 
                ${
                  isSelected
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                }
              `}
            >
              <button
                type="button"
                onClick={() => dispatch(setPaymentMethod(method.id))}
                className="w-full p-4 flex items-center gap-4 cursor-pointer"
              >
                {/* Radio dot */}
                <div
                  className={`
                  w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all
                  ${isSelected ? "border-gray-900" : "border-gray-300"}
                `}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                  )}
                </div>

                <div
                  className={`p-2 rounded-lg ${
                    isSelected ? "bg-white shadow-sm" : "bg-gray-50"
                  }`}
                >
                  {React.cloneElement(method.icon, {
                    className: `w-5 h-5 ${
                      isSelected ? "text-gray-900" : "text-gray-500"
                    }`,
                  })}
                </div>

                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    {method.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {method.description}
                  </p>
                </div>
              </button>

              {/* Conditional UI for specific payment methods */}
              {isSelected && method.id === "card" && (
                <div className="p-4 pt-0 border-t border-gray-200 mt-2 space-y-3">
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <CustomFormInput
                      label="Name on Card"
                      name="cardName"
                      className="focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-300"
                      placeholder="e.g. Ali Khan"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                    <div className="w-full">
                      <label className="block text-gray-700 font-medium mb-1 text-sm">
                        Exp Date
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="w-full h-[42px] border border-gray-300 rounded-lg px-3 py-3 bg-white focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-300 transition-all">
                        <CardExpiryElement
                          onChange={(e) => handleStripeChange(e, "cardExpiry")}
                          options={{ style: { base: { fontSize: "14px" } } }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="w-full">
                      <label className="block text-gray-700 font-medium mb-1 text-sm">
                        Card Number
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="w-full h-[42px] border border-gray-300 rounded-lg px-3 py-3 bg-white focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-300 transition-all">
                        <CardNumberElement
                          onChange={(e) => handleStripeChange(e, "cardNumber")}
                          options={{ style: { base: { fontSize: "14px" } } }}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block text-gray-700 font-medium mb-1 text-sm">
                        CVV
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="w-full h-[42px] border border-gray-300 rounded-lg px-3 py-3 bg-white focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-300 transition-all">
                        <CardCvcElement
                          onChange={(e) => handleStripeChange(e, "cardCvc")}
                          options={{ style: { base: { fontSize: "14px" } } }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isSelected && method.id === "paypal" && (
                <div className="p-4 pt-0 border-t border-gray-200 mt-2 space-y-3">
                  <div className="mt-3">
                    <CustomFormInput
                      label="PayPal Email"
                      name="email"
                      type="email"
                      className="focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-300"
                      placeholder="e.g. ali@example.com"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate("/checkout")}
          className="px-4 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all duration-200 flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={paymentHandler}
          disabled={isPlacingOrder || !stripe}
          className="flex-1 py-3.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 active:bg-black disabled:opacity-60 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isPlacingOrder ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </div>
  );
};

export default Payment;
