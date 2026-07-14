import React, { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, ShoppingBag, Package } from "lucide-react";
import { useDispatch } from "react-redux";
import { resetCheckout } from "../services/store/slices/checkoutSlice";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // Extract order IDs from query parameters
  const orderIdsQuery = searchParams.get("orderIds");
  const orderIds = useMemo(() => {
    return orderIdsQuery ? orderIdsQuery.split(",").filter(Boolean) : [];
  }, [orderIdsQuery]);

  useEffect(() => {
    // Clear checkout state upon successful order (in case it wasn't cleared)
    dispatch(resetCheckout());
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

        <p className="text-gray-500 mb-6 text-sm">
          Thank you for your purchase. We've received your order and will begin
          processing it shortly. You will receive an order confirmation email
          with details.
        </p>

        {/* Display multiple order IDs if grouped */}
        {orderIds.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left border border-gray-100">
            <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-800">
              <Package className="w-4 h-4 text-gray-500" />
              Order Reference(s)
            </div>
            <ul className="space-y-2">
              {orderIds.map((id, index) => (
                <li
                  key={index}
                  className="text-xs bg-white border border-gray-200 px-3 py-2 rounded-lg font-mono text-gray-600 flex justify-between items-center"
                >
                  <span>Order #{index + 1}</span>
                  <span className="font-semibold text-gray-900">{id}</span>
                </li>
              ))}
            </ul>
            {orderIds.length > 1 && (
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                Note: Your cart contained items from multiple sellers, so we've
                split them into separate orders for faster processing.
              </p>
            )}
          </div>
        )}

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
