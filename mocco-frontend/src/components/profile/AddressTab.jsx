import React from "react";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import CustomButton from "../common/CustomButton";
import CustomFormInput from "../common/inputs/CustomFormInput";
import { Country, State } from "country-state-city";

const AddressTab = ({
  showAddressForm,
  setShowAddressForm,
  addressForm,
  onInputChange,
  onAddAddress,
  addressTypes,
  addresses,
  onDeleteAddress,
  onCancelAddressForm,
  isLoading,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500 mb-2">
            Addresses
          </p>
          <h2 className="text-xl sm:text-2xl text-gray-900 font-semibold tracking-tight">
            Manage Addresses
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Add, review, or remove saved delivery locations.
          </p>
        </div>
        {showAddressForm ? (
          <div className="w-full sm:w-auto">
            <CustomButton
              buttonText="Cancel"
              variant="dark"
              className="sm:min-w-28"
              onClick={onCancelAddressForm}
            />
          </div>
        ) : (
          <div className="w-full sm:w-auto">
            <CustomButton
              buttonText="Add New Address"
              variant="dark"
              className="sm:min-w-40"
              onClick={() => setShowAddressForm(true)}
            />
          </div>
        )}
      </div>

      {showAddressForm && (
        <form
          onSubmit={onAddAddress}
          className="border border-gray-200 bg-white text-black rounded-3xl p-4 sm:p-5 space-y-4 shadow-sm"
        >
          <h3 className="text-xl text-gray-900 font-semibold">
            Add New Address
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={addressForm.country}
                onChange={onInputChange}
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
                value={addressForm.state}
                onChange={onInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300"
              >
                <option value="">Select State</option>
                {addressForm.country &&
                  State.getStatesOfCountry(addressForm.country).map(
                    (state, index) => (
                      <option
                        key={`${addressForm.country}-${state.isoCode}-${state.name}-${index}`}
                        value={state.isoCode}
                      >
                        {state.name}
                      </option>
                    ),
                  )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomFormInput
              label="City"
              name="city"
              value={addressForm.city}
              onChange={onInputChange}
              placeholder="Enter city name"
              required
            />
            <CustomFormInput
              label="Zip Code"
              name="zipCode"
              value={addressForm.zipCode}
              onChange={onInputChange}
              placeholder="Zip Code"
              required
            />
          </div>

          <CustomFormInput
            label="Street Address 1"
            name="address1"
            value={addressForm.address1}
            onChange={onInputChange}
            placeholder="Street Address 1"
            required
          />
          <CustomFormInput
            label="Street Address 2"
            name="address2"
            value={addressForm.address2}
            onChange={onInputChange}
            placeholder="Street Address 2 (Optional)"
          />

          <div className="w-full md:max-w-md">
            <label className="block text-gray-700 font-medium mb-1">
              Address Type
            </label>
            <select
              name="addressType"
              value={addressForm.addressType}
              onChange={onInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300"
            >
              {addressTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:max-w-40">
            <CustomButton
              buttonText={isLoading ? "Adding..." : "Add Address"}
              type="submit"
              variant="success"
              disabled={isLoading}
            />
          </div>
        </form>
      )}

      {!showAddressForm && (
        <>
          {/* <h3 className="text-xl text-gray-900 font-semibold mb-4">
            Your Addresses
          </h3> */}
          {addresses.length === 0 ? (
            <div className="border border-dashed border-gray-200 rounded-3xl px-5 py-14 text-center text-gray-600 bg-gray-50">
              <AddLocationAltIcon className="text-6xl text-gray-300 mb-2" />
              <p className="text-base sm:text-lg font-medium text-gray-700">
                No addresses found
              </p>
              <p className="text-sm sm:text-base mt-1">
                Click "Add New Address" to add your first address.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((address) => (
                <article
                  key={address._id || address.id}
                  className="border border-gray-200 rounded-3xl p-4 sm:p-5 bg-white shadow-sm"
                >
                  <div className="flex flex-wrap justify-between gap-2">
                    <h4 className="text-base sm:text-lg text-gray-900 font-semibold">
                      {address.addressType}
                    </h4>
                    <button
                      type="button"
                      onClick={() => onDeleteAddress(address._id)}
                      disabled={isLoading}
                      className="text-red-600 hover:text-red-700 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 mt-2">
                    {address.address1}
                  </p>
                  {address.address2 && (
                    <p className="text-sm sm:text-base text-gray-700">
                      {address.address2}
                    </p>
                  )}
                  <p className="text-sm sm:text-base text-gray-700">
                    {address.city}, {address.state}, {address.country} -{" "}
                    {address.zipCode}
                  </p>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AddressTab;
