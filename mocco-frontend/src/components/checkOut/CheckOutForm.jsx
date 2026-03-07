import React from "react";
import CustomFormInput from "../common/inputs/CustomFormInput";

const CheckOutForm = ({ formData, handleChange }) => {
  return (
    <div>
      <div className="flex-1 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-6">Billing Details</h2>
        <CustomFormInput
          label="First Name"
          placeholder="Enter your first name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mb-4"
          required
        />
        <CustomFormInput
          label="Company Name"
          placeholder="Enter your company name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="mb-4"
        />
        <CustomFormInput
          label="Street Address"
          placeholder="Enter your street address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="mb-4"
        />
        <CustomFormInput
          label="Apartment, floor, etc."
          placeholder="Optional"
          name="apartment"
          value={formData.apartment}
          onChange={handleChange}
          className="mb-4"
        />
        <CustomFormInput
          label="Town/City"
          placeholder="Enter your city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="mb-4"
          required
        />
        <CustomFormInput
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mb-4"
          required
        />
        <CustomFormInput
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mb-4"
          required
        />
        <div className="flex items-center mt-4">
          <input type="checkbox" id="saveInfo" className="mr-2" />
          <label htmlFor="saveInfo" className="text-gray-600">
            Save this information for faster check-out next time
          </label>
        </div>
      </div>
    </div>
  );
};

export default CheckOutForm;
