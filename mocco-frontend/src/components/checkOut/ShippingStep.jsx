import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  MapPin,
  Check,
  Trash2,
  Loader2,
  ChevronRight,
} from "lucide-react";
import {
  setSelectedAddress,
  setShippingMethod,
} from "../../services/store/slices/checkoutSlice";
import { SHIPPING_METHODS } from "../../services/store/slices/checkoutSlice";
import { addAddress, deleteAddress } from "../../services/store/actions/user";
import { loadUser } from "../../services/store/actions/user";
import { Country, State } from "country-state-city";
import toast from "react-hot-toast";
import CustomFormInput from "../common/inputs/CustomFormInput";

const ADDRESS_TYPES = ["Home", "Office", "Default"];

const emptyForm = {
  country: "",
  state: "",
  city: "",
  zipCode: "",
  address1: "",
  address2: "",
  addressType: "Home",
};

const ShippingStep = ({ onNext }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { selectedAddressId, shippingMethod } = useSelector(
    (state) => state.checkout,
  );

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  const addresses = user?.addresses || [];

  // Form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      setForm((prev) => ({ ...prev, country: value, state: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (
      !form.country ||
      !form.state ||
      !form.city ||
      !form.zipCode ||
      !form.address1
    ) {
      toast.error("Please fill all required address fields");
      return;
    }
    setFormLoading(true);
    const res = await dispatch(addAddress(form));
    setFormLoading(false);
    if (res.success) {
      toast.success(res.message);
      dispatch(loadUser());
      setForm(emptyForm);
      setShowForm(false);
    } else {
      toast.error(res.message);
    }
  };

  const handleDeleteAddress = async (addressId, e) => {
    e.stopPropagation();
    setDeleteLoadingId(addressId);
    const res = await dispatch(deleteAddress(addressId));
    setDeleteLoadingId(null);
    if (res.success) {
      toast.success(res.message);
      dispatch(loadUser());
      if (selectedAddressId === addressId) {
        dispatch(setSelectedAddress(null));
      }
    } else {
      toast.error(res.message);
    }
  };

  //  Proceed validation
  const handleNext = () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Saved Addresses */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            Delivery Address
          </h2>
          {!showForm && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="text-sm text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add new
            </button>
          )}
        </div>

        {/* Address list */}
        {addresses.length === 0 && !showForm ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
            <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium mb-1">No saved addresses</p>
            <p className="text-xs">Add an address to continue checkout</p>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-3 text-sm font-semibold text-gray-700 underline cursor-pointer"
            >
              Add address
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {addresses.map((addr) => {
              const isSelected = selectedAddressId === addr._id;
              const isDeleting = deleteLoadingId === addr._id;

              return (
                <button
                  key={addr._id}
                  type="button"
                  onClick={() => dispatch(setSelectedAddress(addr._id))}
                  className={`
                    w-full text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                    ${
                      isSelected
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    {/* Radio indicator */}
                    <div
                      className={`
                      mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all
                      ${isSelected ? "border-gray-900 bg-gray-900" : "border-gray-300"}
                    `}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>

                    {/* Address details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-gray-900">
                          {addr.addressType}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                          {addr.country}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-snug">
                        {addr.address1}
                        {addr.address2 ? `, ${addr.address2}` : ""}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {addr.city}, {addr.state} {addr.zipCode}
                      </p>
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={(e) => handleDeleteAddress(addr._id, e)}
                      disabled={isDeleting}
                      className="shrink-0 text-gray-300 hover:text-red-500 transition-colors p-1 cursor-pointer disabled:opacity-50"
                      title="Delete address"
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Add address form */}
        {showForm && (
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
                label="City *"
                name="city"
                placeholder="e.g. Lahore"
                value={form.city}
                onChange={handleFormChange}
                required
              />
              <CustomFormInput
                label="Zip Code *"
                name="zipCode"
                placeholder="e.g. 54000"
                value={form.zipCode}
                onChange={handleFormChange}
                required
              />
            </div>

            {/* Street Address 1 */}
            <CustomFormInput
              label="Street Address 1 *"
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
                    onClick={() =>
                      setForm((p) => ({ ...p, addressType: type }))
                    }
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
        )}
      </section>

      {/* Shipping Method */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          Shipping Method
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SHIPPING_METHODS.map((method) => {
            const isSelected = shippingMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => dispatch(setShippingMethod(method.id))}
                className={`
                  text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                  ${
                    isSelected
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  {/* Radio dot */}
                  <div
                    className={`
                    w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all
                    ${isSelected ? "border-gray-900" : "border-gray-300"}
                  `}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-gray-900" />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                      {method.label}
                    </p>
                    <p className="text-xs text-gray-500">
                      {method.description}
                    </p>
                  </div>

                  <span
                    className={`text-sm font-bold shrink-0 ${method.price === 0 ? "text-green-600" : "text-gray-900"}`}
                  >
                    {method.price === 0 ? "Free" : `$${method.price}`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Continue Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={!selectedAddressId}
        className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 active:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
      >
        Continue to Payment
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ShippingStep;
