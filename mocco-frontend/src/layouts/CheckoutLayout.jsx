import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { ShoppingCart, Lock } from "lucide-react";

import CheckoutStepper from "../components/checkOut/CheckoutStepper";
import OrderSummary from "../components/checkOut/OrderSummary";
import {
  setShippingMethod,
  updateTotals,
} from "../services/store/slices/checkoutSlice";

const CheckoutLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems, isLoading: cartLoading } = useSelector(
    (state) => state.cart,
  );

  const { isUserAuthenticated } = useSelector((state) => state.user);

  // Determine current step from URL path
  const currentStep = useMemo(() => {
    if (location.pathname === "/payment") return 2;
    if (location.pathname.startsWith("/order/success")) return 3;
    return 1; // default to shipping
  }, [location.pathname]);

  // Compute subtotal from cart items and sync into checkout state
  const subtotal =
    cartItems?.reduce((acc, item) => {
      const price =
        item.productId?.discount_price || item.productId?.price || 0;
      return acc + price * item.quantity;
    }, 0) || 0;

  const { shippingPrice } = useSelector((state) => state.checkout);

  // Keep checkout totals in sync any time cart, coupon, or shipping method changes
  useEffect(() => {
    dispatch(
      updateTotals({
        subtotal,
        cartItems,
      }),
    );
  }, [subtotal, shippingPrice, cartItems, dispatch]);

  // Initialize default shipping method
  useEffect(() => {
    dispatch(setShippingMethod("free"));
  }, [dispatch]);

  // Guard: redirect guests to login
  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate("/login");
    }
  }, [isUserAuthenticated, navigate]);

  // Guard: empty cart
  if (!cartLoading && cartItems.length === 0) {
    return (
      <div className="container max-w-3xl mx-auto py-20 px-4 text-center">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-12 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-gray-300" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Your cart is empty
          </h2>
          <p className="text-gray-500 text-sm max-w-xs">
            Add items to your cart before proceeding to checkout.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-2 px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition cursor-pointer"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50/60">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Page heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Checkout
          </h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            Secure, encrypted checkout
          </p>
        </div>

        {/* Stepper */}
        <CheckoutStepper currentStep={currentStep} />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start mt-8">
          {/* Left — active step content (Outlet renders ShippingStep or PaymentStep) */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-7">
            <Outlet />
          </div>

          {/* Right — sticky order summary */}
          <div className="lg:sticky lg:top-22">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
