import React from "react";
import CustomFormInput from "../common/inputs/CustomFormInput";
import CustomButton from "../common/CustomButton";

const OrderDetails = ({ coupon, setCoupon, handlePlaceOrder }) => {
  return (
    <>
      <div className="w-full md:w-96 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Your Order</h2>
        <div className="flex justify-between mb-2">
          <span>LCD Monitor</span>
          <span>$650</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Hi Gamepad</span>
          <span>$1100</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-medium mb-2">
          <span>Subtotal:</span>
          <span>$1750</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-semibold mb-4">
          <span>Total:</span>
          <span>$1750</span>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="flex items-center mb-2">
            <input type="radio" name="payment" className="mr-2" />
            Bank
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              className="mr-2"
              defaultChecked
            />
            Cash on delivery
          </label>
        </div>

        {/* Coupon Code */}
        <div className="flex gap-2 mb-4">
          <CustomFormInput
            type="text"
            placeholder="Coupon Code"
            name="coupon"
            value={coupon}
            className="mb-0"
            onChange={(e) => setCoupon(e.target.value)}
            required
          />
          <CustomButton
            className={"text-sm sm:text-base"}
            buttonText="Apply Coupon"
            variant="dark"
          />
        </div>

        <CustomButton
          buttonText="Place Order"
          variant="danger"
          onClick={handlePlaceOrder}
        />
      </div>
    </>
  );
};

export default OrderDetails;
