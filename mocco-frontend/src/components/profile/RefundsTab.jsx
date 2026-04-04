import React from "react";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CustomButton from "../common/CustomButton";
import CustomFormInput from "../common/inputs/CustomFormInput";

const RefundsTab = ({
  orders,
  refundRequests,
  refundOrderId,
  setRefundOrderId,
  refundReason,
  setRefundReason,
  onSubmit,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500 mb-2">
          Refunds
        </p>
        <h2 className="text-xl sm:text-2xl text-gray-900 font-semibold tracking-tight">
          Refund Requests ({refundRequests.length})
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Submit and manage refund requests in one place.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-white text-black border border-gray-200 rounded-3xl p-4 sm:p-5 shadow-sm"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">Order</label>
          <select
            value={refundOrderId}
            onChange={(e) => setRefundOrderId(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300"
          >
            <option value="">Select order</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                #{order.id} - ${order.total.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <CustomFormInput
          label="Refund Reason"
          name="refundReason"
          value={refundReason}
          onChange={(e) => setRefundReason(e.target.value)}
          placeholder="Why do you need refund?"
          required
        />

        <div className="w-full md:max-w-40">
          <CustomButton buttonText="Request" type="submit" variant="dark" />
        </div>
      </form>

      {refundRequests.length === 0 ? (
        <div className="border border-dashed border-gray-200 rounded-3xl px-5 py-14 text-center text-gray-600 bg-gray-50">
          <Inventory2OutlinedIcon className="text-6xl text-gray-300 mb-2" />
          <p className="text-base sm:text-lg font-medium text-gray-700">
            No refund requests found
          </p>
          <p className="text-sm sm:text-base mt-1">
            Refund requests will appear here when you request them.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {refundRequests.map((request) => (
            <article
              key={request.id}
              className="border border-gray-200 rounded-3xl p-4 sm:p-5 bg-white shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-base sm:text-lg font-semibold text-gray-900">
                  #{request.orderId}
                </p>
                <span className="text-xs rounded-full px-3 py-1 bg-amber-100 text-amber-700 capitalize">
                  {request.status}
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-700 mt-2">
                Shop: {request.shop}
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                Reason: {request.reason}
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                Total:{" "}
                <span className="text-emerald-600">
                  ${request.total.toFixed(2)}
                </span>
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Requested on {request.createdAt}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default RefundsTab;
