import React, { useState } from "react";
import CheckOutForm from "../components/checkOut/CheckOutForm";
import OrderDetails from "../components/checkOut/OrderDetails";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    address: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
  });
  const [coupon, setCoupon] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    console.log("Order Placed:", formData);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-6 text-black">
      {/* Billing Details */}
      <CheckOutForm formData={formData} handleChange={handleChange} />

      {/* Order Summary */}
      <OrderDetails
        coupon={coupon}
        setCoupon={setCoupon}
        handlePlaceOrder={handlePlaceOrder}
      />
    </div>
  );
};

export default Checkout;
