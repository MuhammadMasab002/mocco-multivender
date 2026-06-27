import React, { useState } from "react";
import CustomButton from "../components/common/CustomButton";
import CustomFormInput from "../components/common/inputs/CustomFormInput";
import CartTable from "../components/cart/CartTable";
import CartSummaryBox from "../components/cart/CartSummaryBox";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  clearGuestCartAction,
} from "../services/store/actions/cart";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isUserAuthenticated } = useSelector((state) => state.user);
  const { cartItems, isLoading } = useSelector((state) => state.cart);

  const [isClearing, setIsClearing] = useState(false);

  const subtotal =
    cartItems?.reduce((acc, item) => {
      const price =
        item.productId?.discount_price || item.productId?.price || 0;
      return acc + price * item.quantity;
    }, 0) || 0;

  const handleClearCart = async () => {
    if (isUserAuthenticated) {
      try {
        setIsClearing(true);
        await dispatch(clearCart());
        toast.success("Cart cleared");
      } catch (err) {
        console.error(err);
      } finally {
        setIsClearing(false);
      }
    } else {
      dispatch(clearGuestCartAction());
      toast.success("Cart cleared");
    }
  };

  const totalItems =
    cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  if (isLoading && cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container max-w-6xl mx-auto py-16 sm:px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <ShoppingCart className="w-12 h-12 text-slate-300" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-slate-500 max-w-md mb-8">
            Looks like you haven't added anything to your cart yet. Explore our
            products and find something you love!
          </p>
          <CustomButton
            buttonText="Explore Products"
            variant="dark"
            onClick={() => navigate("/products")}
            className="px-8"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-6 sm:px-6 space-y-8 text-black">
      {/* show total items in cart */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-2 pt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Your Shopping Cart
          </h1>
          {!isLoading && (
            <span className="bg-slate-200 text-slate-700 py-1 px-3 rounded-full text-sm font-semibold">
              {totalItems} items
            </span>
          )}
        </div>

        {totalItems > 0 && (
          <div className="hidden sm:block">
            <CustomButton
              buttonText={isClearing ? "Clearing..." : "Clear Cart"}
              variant="outline"
              className="text-red-500 border-red-200 hover:bg-red-50"
              onClick={handleClearCart}
              disabled={isClearing}
            />
          </div>
        )}
      </div>

      {/* Cart Table */}
      <div className="rounded border shadow-sm">
        <CartTable cartItems={cartItems} />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 itemscenter">
        <div className="w-full flex sm:block justify-between gap-4 items-center">
          <div className="sm:w-full sm:max-w-50">
            <CustomButton
              buttonText="Return To Shop"
              variant="outline"
              className="text-sm sm:text-base w-auto px-6"
              onClick={() => navigate("/products")}
            />
          </div>
          {totalItems > 0 && (
            <div className="block sm:hidden">
              <CustomButton
                buttonText={isClearing ? "Clearing..." : "Clear Cart"}
                variant="outline"
                className="text-red-500 border-red-200 hover:bg-red-50"
                onClick={handleClearCart}
                disabled={isClearing}
              />
            </div>
          )}
        </div>

        <div className="flex w-full justify-end">
          <CartSummaryBox
            subtotal={subtotal}
            shipping="Free"
            total={subtotal}
            onCheckout={() => navigate("/checkout")}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
