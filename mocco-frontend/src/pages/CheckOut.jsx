import React from "react";
import { useNavigate } from "react-router-dom";
import ShippingStep from "../components/checkOut/ShippingStep";

const CheckOut = () => {
  const navigate = useNavigate();

  return <ShippingStep onNext={() => navigate("/payment")} />;
};

export default CheckOut;
