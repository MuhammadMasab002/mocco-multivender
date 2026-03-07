import React, { useState } from "react";
import CustomButton from "../components/common/CustomButton";
import CustomFormInput from "../components/common/inputs/CustomFormInput";
import CartTable from "../components/cart/CartTable";
import CartSummaryBox from "../components/cart/CartSummaryBox";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      product: "LCD Monitor",
      price: 650,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1656944227421-d0e8de487d9d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      product: "HI Gamepad",
      price: 550,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1634624943458-3e29f132d4d2?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);

  const updateQuantity = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Number(newQty) } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="container max-w-6xl mx-auto py-6 sm:px-6 space-y-8 text-black">
      {/* Cart Table */}
      <div className="rounded border shadow-sm">
        <CartTable
          cartItems={cartItems}
          onQuantityChange={updateQuantity}
          onRemove={removeItem}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <div>
          <CustomButton
            buttonText="Return To Shop"
            variant="outline"
            className="text-sm sm:text-base w-auto px-6"
          />
        </div>
        <div>
          <CustomButton
            buttonText="Update Cart"
            variant="outline"
            className="text-sm sm:text-base w-auto px-6"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Coupon */}
        <div className="flex flex-row md:flex-col lg:flex-row gap-3 items-start">
          <CustomFormInput
            placeholder="Coupon Code"
            className="text-sm sm:text-base w-full w64"
          />
          <CustomButton
            buttonText="Apply Coupon"
            variant="danger"
            className="text-sm sm:text-base w-auto px-0! sm:px-6!"
          />
        </div>

        {/* Cart Summary */}
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
