import React from "react";

const CartTable = ({ onQuantityChange, onRemove, cartItems }) => {
  return (
    <div>
      <div className="grid grid-cols-4 bg-gray-100 px-4 py-3 rounded font-semibold text-gray-600 text-center">
        <p>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Subtotal</p>
      </div>
      {cartItems.length === 0 ? (
        <p className="text-center py-6 text-gray-500">empty cart!!</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-4 items-center px-4 py-4 border-b"
          >
            {/* Product */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onRemove(item.id)}
                className="text-red-500 text-xl hover:text-red-700"
              >
                ×
              </button>
              <img
                src={item?.image}
                //   alt={item?.product}
                className="w-14 h-14 object-cover rounded hidden sm:block"
              />
              <span className="text-sm sm:text-base text-gray-700">
                {item?.product}
              </span>
            </div>

            {/* Price */}
            <p className="text-xs sm:text-sm md:text-base text-gray-700 text-center">
              ${item?.price}
            </p>

            {/* Quantity selector */}
            <div className="flex justify-center">
              <select
                value={item?.quantity}
                onChange={(e) => onQuantityChange(item.id, e.target.value)}
                className="border px-2 py-1 rounded"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            {/* Subtotal */}
            <p className="text-xs sm:text-sm md:text-base text-gray-700 text-center">
              ${item?.price * item?.quantity}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default CartTable;
