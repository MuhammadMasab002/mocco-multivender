import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import { resetCheckout } from "../services/store/slices/checkoutSlice";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear checkout state upon successful order
    dispatch(resetCheckout());
    // (Also clear cart here when integrated with backend)
  }, [dispatch]);

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mb-8 text-sm">
          Thank you for your purchase. We've received your order and will begin
          processing it shortly. You will receive an order confirmation email
          with details of your order.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/my-profile")}
            className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-all cursor-pointer"
          >
            View My Orders
          </button>

          <button
            onClick={() => navigate("/products")}
            className="w-full py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
