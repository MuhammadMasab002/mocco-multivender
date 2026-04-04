import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddIcon from "@mui/icons-material/Add";
import CustomButton from "../common/CustomButton";
import CustomFormInput from "../common/inputs/CustomFormInput";

const PaymentMethodTab = ({
  paymentMethods,
  showPaymentForm,
  paymentForm,
  onInputChange,
  onAddPaymentMethod,
  onDeletePaymentMethod,
  onCancelPaymentForm,
  onShowPaymentForm,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500 mb-2">
          Billing
        </p>
        <h2 className="text-xl sm:text-2xl text-gray-900 font-semibold tracking-tight">
          Payment Method
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Manage saved cards for quick and secure checkout.
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        {showPaymentForm ? (
          <div className="w-full sm:w-auto">
            <CustomButton
              buttonText="Cancel"
              variant="dark"
              className="sm:min-w-28"
              onClick={onCancelPaymentForm}
            />
          </div>
        ) : (
          <div className="w-full sm:w-auto">
            <CustomButton
              buttonText="Add New Method"
              variant="dark"
              onClick={onShowPaymentForm}
            />
          </div>
        )}
      </div>

      {showPaymentForm && (
        <form
          onSubmit={onAddPaymentMethod}
          className="border border-gray-200 bg-white text-black rounded-3xl p-4 sm:p-5 space-y-4 shadow-sm"
        >
          <h3 className="text-xl text-gray-900 font-semibold">Add New Card</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Card Type
              </label>
              <select
                name="cardType"
                value={paymentForm.cardType}
                onChange={onInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300"
              >
                <option value="VISA">VISA</option>
                <option value="MASTERCARD">MASTERCARD</option>
              </select>
            </div>
            <CustomFormInput
              label="Card Holder Name"
              name="cardHolder"
              value={paymentForm.cardHolder}
              onChange={onInputChange}
              placeholder="Enter card holder name"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CustomFormInput
              label="Last 4 Digits"
              name="last4"
              value={paymentForm.last4}
              onChange={onInputChange}
              placeholder="1234"
              required
            />
            <CustomFormInput
              label="Expiry Month"
              name="expiryMonth"
              value={paymentForm.expiryMonth}
              onChange={onInputChange}
              placeholder="08"
              required
            />
            <CustomFormInput
              label="Expiry Year"
              name="expiryYear"
              value={paymentForm.expiryYear}
              onChange={onInputChange}
              placeholder="2028"
              required
            />
          </div>

          <div className="w-full sm:max-w-48">
            <CustomButton
              buttonText="Save Card"
              type="submit"
              variant="success"
            />
          </div>
        </form>
      )}

      {!showPaymentForm && (
        <div className="space-y-3">
          {paymentMethods.length === 0 ? (
            <div className="border border-dashed border-gray-200 rounded-3xl px-5 py-14 text-center text-gray-600 bg-gray-50">
              <CreditCardIcon className="text-6xl text-gray-300 mb-2" />
              <p className="text-base sm:text-lg font-medium text-gray-700">
                No payment methods found
              </p>
              <p className="text-sm sm:text-base mt-1">
                Click "Add New Payment Method" to add your first card.
              </p>
            </div>
          ) : (
            paymentMethods.map((method) => (
              <article
                key={method.id}
                className="bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3 sm:gap-5 text-gray-900">
                  {/* <div className="min-w-16 sm:min-w-20 text-[11px] sm:text-xs font-bold tracking-wide text-indigo-700 uppercase">
                    {method.cardType}
                  </div> */}
                  {method.cardType === "VISA" ? (
                    <img
                      className="w-10 h-10 object-contain"
                      src="https://bonik-react.vercel.app/assets/images/payment-methods/visa.png"
                      alt=""
                    />
                  ) : (
                    <img
                      className="w-10 h-10 object-contain"
                      src="https://bonik-react.vercel.app/assets/images/payment-methods/master-card.png"
                      alt=""
                    />
                  )}
                  <p className="flex-1 text-xs sm:text-base font-semibold truncate">
                    {method.cardHolder}
                  </p>
                  <p className="hidden sm:block text-sm text-gray-600 tracking-widest">
                    {method.last4} **** **** ****
                  </p>
                  <p className="sm:hidden text-xs text-gray-600 tracking-[0.05em]">
                    {method.last4} ****
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 min-w-fit">
                    {method.expiryMonth}/{method.expiryYear}
                  </p>
                  <button
                    type="button"
                    onClick={() => onDeletePaymentMethod(method.id)}
                    className="cursor-pointer text-gray-600 hover:text-red-600 transition-colors p-1 rounded"
                    aria-label="Delete payment method"
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      )}

      {!showPaymentForm && paymentMethods.length > 0 && (
        <p className="text-xs sm:text-sm italic text-gray-500 flex items-center gap-1">
          <AddIcon fontSize="inherit" />
          You can add multiple cards and remove them anytime.
        </p>
      )}
    </div>
  );
};

export default PaymentMethodTab;
