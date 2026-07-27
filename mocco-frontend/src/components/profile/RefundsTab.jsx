import React from "react";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CustomButton from "../common/CustomButton";
import CustomFormInput from "../common/inputs/CustomFormInput";
import { Loader2 } from "lucide-react";

const REFUND_STATUS_STYLES = {
  Processing: "bg-amber-100 text-amber-800 border-amber-200",
  Approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};

const RefundsTab = ({
  orders = [],
  refunds = [],
  refundsLoading = false,
  requestRefundLoading = false,
  refundOrderId,
  setRefundOrderId,
  refundReason,
  setRefundReason,
  onSubmit,
}) => {
  // Only orders that are Delivered (or the currently selected orderId) can be requested for refund
  const eligibleOrders = orders.filter(
    (order) => order.status === "Delivered" || order._id === refundOrderId,
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500 mb-2">
          Refunds
        </p>
        <h2 className="text-xl sm:text-2xl text-gray-900 font-semibold tracking-tight">
          Refund Requests ({refunds.length})
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Submit and manage refund requests in one place. Only delivered orders
          are eligible for refund.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-white text-black border border-gray-200 rounded-3xl p-4 sm:p-5 shadow-sm"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm">
            Order
          </label>
          <select
            value={refundOrderId}
            onChange={(e) => setRefundOrderId(e.target.value)}
            disabled={requestRefundLoading}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300 disabled:opacity-50 cursor-pointer"
          >
            <option value="">
              {eligibleOrders.length === 0
                ? "No delivered orders available"
                : "Select delivered order"}
            </option>
            {eligibleOrders.map((order) => (
              <option key={order._id} value={order._id}>
                #{order._id} - ${Number(order.totalAmount || 0).toFixed(2)} (
                {order.status})
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
          disabled={requestRefundLoading}
        />

        <div className="w-full md:max-w-40">
          <button
            type="submit"
            disabled={
              requestRefundLoading || !refundOrderId || !refundReason.trim()
            }
            className="w-full py-2.5 px-4 bg-gray-900 text-white font-semibold text-sm rounded-xl hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {requestRefundLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Submitting…
              </>
            ) : (
              "Request"
            )}
          </button>
        </div>
      </form>

      {/* Refund Request History */}
      {refundsLoading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <p className="text-sm">Loading refund requests…</p>
        </div>
      ) : refunds.length === 0 ? (
        <div className="border border-dashed border-gray-200 rounded-3xl px-5 py-14 text-center text-gray-600 bg-gray-50">
          <Inventory2OutlinedIcon className="text-6xl text-gray-300 mb-2" />
          <p className="text-base sm:text-lg font-medium text-gray-700">
            No refund requests found
          </p>
          <p className="text-sm sm:text-base mt-1">
            Refund requests will appear here when you submit them.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {refunds.map((request) => {
            const orderIdStr =
              typeof request.order === "object"
                ? request.order?._id
                : request.order || request.orderId;
            const shopName =
              typeof request.shop === "object"
                ? request.shop?.name
                : request.shop || "Shop";

            const statusClass =
              REFUND_STATUS_STYLES[request.status] ||
              "bg-gray-100 text-gray-700 border-gray-200";

            return (
              <article
                key={request._id || request.id}
                className="border border-gray-200 rounded-3xl p-4 sm:p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-400">Order ID</p>
                    <p className="text-base sm:text-lg font-mono font-semibold text-gray-900">
                      #{orderIdStr}
                    </p>
                  </div>
                  <span
                    className={`text-xs rounded-full px-3 py-1 font-semibold border ${statusClass}`}
                  >
                    {request.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-700">
                  <div>
                    <p className="text-xs text-gray-400">Shop</p>
                    <p className="font-medium text-gray-900">{shopName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Total Amount</p>
                    <p className="font-bold text-emerald-600">
                      ${Number(request.totalAmount || 0).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Requested On</p>
                    <p className="font-medium text-gray-700">
                      {new Date(request.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-50 text-sm">
                  <p className="text-xs text-gray-400 mb-0.5">Refund Reason</p>
                  <p className="text-gray-800 font-normal">{request.reason}</p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RefundsTab;
