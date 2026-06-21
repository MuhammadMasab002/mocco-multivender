import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartItemQty,
  removeFromCart,
  updateGuestCartQtyAction,
  removeFromGuestCartAction,
} from "../../services/store/actions/cart";
import { CircularProgress } from "@mui/material";

const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";

const CartTable = ({ cartItems }) => {
  const dispatch = useDispatch();
  const { isUserAuthenticated } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.cart);

  const handleRemove = (productId) => {
    if (isUserAuthenticated) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(removeFromGuestCartAction(productId));
    }
  };

  const handleQuantityChange = (productId, newQty, stock) => {
    const quantity = Number(newQty);
    if (isUserAuthenticated) {
      dispatch(updateCartItemQty(productId, quantity));
    } else {
      dispatch(updateGuestCartQtyAction(productId, quantity, stock));
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
      <div className="grid grid-cols-4 bg-gray-100 px-4 py-3 rounded font-semibold text-gray-600 text-center">
        <p>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Subtotal</p>
      </div>
      {cartItems.map((item) => {
        const product = item.productId;
        if (!product) return null;

        const price = product.discount_price || product.price || 0;
        const productId = product._id || product.id;

        return (
          <div
            key={productId}
            className="grid grid-cols-4 items-center px-4 py-4 border-b"
          >
            {/* Product */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleRemove(productId)}
                className="text-red-500 text-xl hover:text-red-700"
                disabled={isLoading}
              >
                ×
              </button>
              <img
                src={
                  product?.images?.[0]
                    ? `${backendUrl.replace("/api/v1", "")}${product.images[0]}`
                    : "https://via.placeholder.com/150"
                }
                alt={product.name}
                className="w-14 h-14 object-cover rounded hidden sm:block"
              />
              <span className="text-sm sm:text-base text-gray-700 line-clamp-2">
                {product.name}
              </span>
            </div>

            {/* Price */}
            <p className="text-xs sm:text-sm md:text-base text-gray-700 text-center font-medium">
              ${price}
            </p>

            {/* Quantity selector */}
            <div className="flex justify-center">
              <select
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(productId, e.target.value, product.stock)
                }
                disabled={isLoading}
                className="border px-2 py-1 rounded bg-white"
              >
                {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Subtotal */}
            <p className="text-xs sm:text-sm md:text-base text-gray-700 text-center font-medium">
              ${(price * item.quantity).toFixed(2)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CartTable;
