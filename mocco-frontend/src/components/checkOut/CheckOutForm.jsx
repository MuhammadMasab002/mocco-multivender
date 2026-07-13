import React from "react";
import CustomFormInput from "../common/inputs/CustomFormInput";
import { Country, State } from "country-state-city";
import CustomButton from "../common/CustomButton";
import { Loader2 } from "lucide-react";

const ADDRESS_TYPES = ["Home", "Office", "Default"];

const CheckOutForm = ({
  form,
  formLoading,
  emptyForm,
  setForm,
  setShowForm,
  handleAddAddress,
  handleFormChange,
}) => {
  return (
    <form
      onSubmit={handleAddAddress}
      className="mt-3 border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3"
    >
      <h3 className="text-sm font-semibold text-gray-800">New Address</h3>

      {/* Country + State */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            name="country"
            value={form.country}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300"
          >
            <option value="">Select Country</option>
            {Country.getAllCountries().map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            State <span className="text-red-500">*</span>
          </label>
          <select
            name="state"
            value={form.state}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300"
          >
            <option value="">Select State</option>
            {form.country &&
              State.getStatesOfCountry(form.country).map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* City + Zip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <CustomFormInput
          label="City"
          name="city"
          placeholder="e.g. Lahore"
          value={form.city}
          onChange={handleFormChange}
          required
        />
        <CustomFormInput
          label="Zip Code"
          name="zipCode"
          placeholder="e.g. 54000"
          value={form.zipCode}
          onChange={handleFormChange}
          required
        />
      </div>

      {/* Street Address 1 */}
      <CustomFormInput
        label="Street Address 1"
        name="address1"
        placeholder="House no, street name"
        value={form.address1}
        onChange={handleFormChange}
        required
      />

      {/* Street Address 2 */}
      <CustomFormInput
        label="Street Address 2"
        name="address2"
        placeholder="Apartment, suite, etc. (optional)"
        value={form.address2}
        onChange={handleFormChange}
      />

      {/* Address Type */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Address Type
        </label>
        <div className="flex gap-2 flex-wrap">
          {ADDRESS_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setForm((p) => ({ ...p, addressType: type }))}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                form.addressType === type
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Form actions */}
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={formLoading}
          className="flex-1 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-60 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          {formLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving...
            </>
          ) : (
            "Save Address"
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            setShowForm(false);
            setForm(emptyForm);
          }}
          className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckOutForm;
