import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tag, X, Loader2, ShoppingBag, Ticket } from "lucide-react";
import {
  setCouponCode,
  removeCoupon,
  updateTotals,
} from "../../services/store/slices/checkoutSlice";
import { validateCoupon } from "../../services/store/actions/checkout";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const {
    subtotal,
    shippingPrice,
    discountAmount,
    total,
    couponCode,
    appliedCoupon,
    couponLoading,
    couponError,
    // shippingMethod,
  } = useSelector((state) => state.checkout);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    const res = await dispatch(validateCoupon(couponCode, subtotal, cartItems));

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    // Re-run full totals pipeline immediately so discount row disappears
    // and grand total snaps back without waiting for the parent useEffect
    dispatch(updateTotals({ subtotal, cartItems }));
    toast.success("Coupon removed");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleApplyCoupon();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        <ShoppingBag className="w-4 h-4 text-gray-600" />
        <h2 className="font-semibold text-gray-900 text-sm">Order Summary</h2>
        <span className="ml-auto text-xs text-gray-500">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Cart Items */}
      <div className="px-5 py-3 space-y-3 max-h-60 overflow-y-auto">
        {cartItems.map((item) => {
          const product = item.productId;
          const price = product?.discount_price || product?.price || 0;
          const imgUrl = product?.images?.[0]?.url;

          return (
            <div key={product?._id} className="flex items-center gap-3">
              {/* Image with quantity badge */}
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                  {imgUrl ? (
                    <img
                      src={`${backendUrl.replace("/api/v1", "")}${imgUrl}`}
                      alt={product?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <span className="absolute -top-1.5 -right-1.5 bg-gray-800 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] min-h-[18px] px-0.5">
                  {item.quantity}
                </span>
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {product?.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {product?.category}
                </p>
              </div>

              {/* Price */}
              <p className="text-sm font-semibold text-gray-900 shrink-0">
                ${(price * item.quantity).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-100" />

      {/* Coupon */}
      <div className="px-5 py-3">
        {appliedCoupon ? (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <Ticket className="w-4 h-4 text-green-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-green-700">
                {appliedCoupon.code}
              </p>
              <p className="text-xs text-green-600">
                {appliedCoupon.value}% off applied
              </p>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-green-500 hover:text-green-700 shrink-0 cursor-pointer"
              title="Remove coupon"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-300 transition">
              <Tag className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Discount code"
                value={couponCode}
                onChange={(e) => dispatch(setCouponCode(e.target.value))}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400 uppercase"
                disabled={couponLoading}
              />
            </div>
            <button
              onClick={handleApplyCoupon}
              disabled={couponLoading || !couponCode.trim()}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {couponLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                "Apply"
              )}
            </button>
          </div>
        )}
        {couponError && (
          <p className="mt-1.5 text-xs text-red-500">{couponError}</p>
        )}
      </div>

      <div className="border-t border-gray-100" />

      {/* Totals */}
      <div className="px-5 py-4 space-y-2.5">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount ({appliedCoupon?.code})</span>
            <span className="font-medium">−${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span className="font-medium">
            {shippingPrice === 0 ? (
              <span className="text-green-600 font-semibold">Free</span>
            ) : (
              `$${shippingPrice.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="border-t border-gray-100 pt-2.5">
          <div className="flex justify-between">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-gray-900 text-lg">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
