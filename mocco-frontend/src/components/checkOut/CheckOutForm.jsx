import React from "react";
import CustomFormInput from "../common/inputs/CustomFormInput";
import { Country, State } from "country-state-city";
import CustomButton from "../common/CustomButton";

const CheckOutForm = ({ formData, handleChange }) => {
  return (
    <div>
      <div className="flex-1 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
        <form
          // onSubmit={handleChange}
          className="bg-white text-black rounded-3xl p-4 sm:p-5 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomFormInput
              label="Name"
              name="name"
              // value={name}
              // onChange={onInputChange}
              placeholder="Enter your name"
              required
            />
            <CustomFormInput
              label="Phone Number"
              name="phone"
              // value={phone}
              // onChange={onInputChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols2 gap-4">
            <CustomFormInput
              label="Email"
              name="email"
              // value={email}
              // onChange={onInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                // value={addressForm.country}
                // onChange={onInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300"
              >
                <option value="">Select Country</option>
                {Country &&
                  Country.getAllCountries().map((country, index) => (
                    <option
                      key={`${country.isoCode}-${country.name}-${index}`}
                      value={country.isoCode}
                    >
                      {country.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                State
              </label>
              <select
                name="state"
                // value={addressForm.state}
                // onChange={onInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300"
              >
                <option value="">Select State</option>
                {
                  // addressForm.country &&
                  State.getStatesOfCountry().map((state, index) => (
                    <option
                      key={`${state.isoCode}-${state.name}-${index}`}
                      value={state.isoCode}
                    >
                      {state.name}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomFormInput
              label="City"
              name="city"
              // value={addressForm.city}
              // onChange={onInputChange}
              placeholder="Enter city name"
              required
            />
            <CustomFormInput
              label="Zip Code"
              name="zipCode"
              // value={addressForm.zipCode}
              // onChange={onInputChange}
              placeholder="Zip Code"
              required
            />
          </div>

          <CustomFormInput
            label="Street Address 1"
            name="address1"
            // value={addressForm.address1}
            // onChange={onInputChange}
            placeholder="Street Address 1"
            required
          />
          <CustomFormInput
            label="Street Address 2"
            name="address2"
            // value={addressForm.address2}
            // onChange={onInputChange}
            placeholder="Street Address 2 (Optional)"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">
                Choose from the saved addresses:{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                name="addressType"
                // value={addressForm.addressType}
                // onChange={onInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300"
              >
                {/* {addressTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))} */}
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Default</option>
              </select>
            </div>
          </div>
          {/* <div className="flex items-center mt-4">
            <input type="checkbox" id="saveInfo" className="mr-2" />
            <label htmlFor="saveInfo" className="text-gray-600 select-none">
              Save this information for faster check-out next time
            </label>
          </div> */}
        </form>
      </div>
      {/* go to payment */}
      <div className="flex justify-end mt-6 sm:mt-10">
        <div>
          <CustomButton
            buttonText="Proceed to Payment"
            variant="danger"
            className="px-6 py-2"
            // onClick={handleProceedToPayment}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOutForm;
