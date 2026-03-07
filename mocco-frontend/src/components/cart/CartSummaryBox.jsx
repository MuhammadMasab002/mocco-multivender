import React from "react";
import CustomButton from "../common/CustomButton";

const CartSummaryBox = ({ subtotal, shipping, total, onCheckout }) => {
  return (
    <div className="border rounded p-6 w-full md:w-80">
      <h3 className="text-xl font-semibold mb-4">Cart Total</h3>

      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>${subtotal}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span>Shipping:</span>
        <span>{shipping}</span>
      </div>

      <div className="flex justify-between font-semibold text-lg mb-4">
        <span>Total:</span>
        <span>${total}</span>
      </div>

      <CustomButton
        buttonText="Proceed to checkout"
        variant="danger"
        className="text-sm sm:text-base mt-3"
        onClick={onCheckout}
      />
    </div>
  );
};

export default CartSummaryBox;
