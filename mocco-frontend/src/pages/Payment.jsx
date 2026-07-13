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
import { setPaymentMethod } from "../services/store/slices/checkoutSlice";
import CustomFormInput from "../components/common/inputs/CustomFormInput";

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

  const { paymentMethod } = useSelector((state) => state.checkout);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    // Simulate order placement delay for now
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsPlacingOrder(false);

    // In actual implementation, we would call an action here that posts to the backend
    // and gets the order IDs back. For now, navigate to success page.
    navigate("/order/success");
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
            <button
              key={method.id}
              type="button"
              onClick={() => dispatch(setPaymentMethod(method.id))}
              className={`
                w-full text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                ${
                  isSelected
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                }
              `}
            >
              <div className="flex items-center gap-4">
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

                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {method.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {method.description}
                  </p>
                </div>
              </div>

              {/* Conditional UI for specific payment methods could go here */}
              {isSelected && method.id === "card" ? (
                <div className="mt-4 pt-4 border-t border-red-200 space-x-0 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <CustomFormInput
                      label="Name on Card"
                      name="cardName"
                      placeholder="e.g. Ali Khan"
                      // value={form.cardName}
                      // onChange={handleFormChange}
                      required
                    />
                    <CustomFormInput
                      label="Exp Date"
                      name="expDate"
                      placeholder="e.g. 12/25"
                      // value={form.expDate}
                      // onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <CustomFormInput
                      label="Card Number"
                      name="cardNumber"
                      placeholder="e.g. 4242 4242 4242 4242"
                      // value={form.cardNumber}
                      // onChange={handleFormChange}
                      required
                    />
                    <CustomFormInput
                      label="CVV"
                      name="cvv"
                      placeholder="e.g. 123"
                      // value={form.cvv}
                      // onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>
              ) : isSelected && method.id === "paypal" ? (
                <div className="mt-4 pt-4 border-t border-red-200 space-x-0 space-y-3">
                  <CustomFormInput
                    label="Email"
                    name="email"
                    placeholder="e.g. ali@example.com"
                    // value={form.email}
                    // onChange={handleFormChange}
                    required
                  />
                </div>
              ) : null}
            </button>
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
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
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
