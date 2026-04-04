import React from "react";
import CallIcon from "@mui/icons-material/Call";

const statusPillClasses = {
  shipping: "bg-blue-100 text-blue-700",
  processing: "bg-amber-100 text-amber-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

const paymentStatusClasses = {
  pending: "text-amber-600",
  paid: "text-emerald-600",
  failed: "text-red-600",
};

const OrdersTab = ({ orders }) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500 mb-2">
          Orders
        </p>
        <h2 className="text-xl sm:text-2xl text-gray-900 font-semibold tracking-tight">
          Your Orders ({orders.length})
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Review your recent orders and shipment details.
        </p>
      </div>
      <div className="space-y-4">
        {orders.map((order) => (
          <article
            key={order.id}
            className="border border-gray-200 rounded-3xl p-4 sm:p-5 space-y-4 bg-white shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-900">
              <div>
                <p className="text-base sm:text-lg font-semibold">
                  Order ID: <span className="font-normal">#{order.id}</span>
                </p>
                <p className="text-sm sm:text-base mt-2">
                  <span className="font-semibold">Date:</span> {order.date}
                </p>
                <p className="text-sm sm:text-base mt-2">
                  <span className="font-semibold">Payment:</span>{" "}
                  {order.paymentMethod}
                </p>
              </div>

              <div>
                <p className="text-sm sm:text-base">
                  <span className="font-semibold">Shop:</span> {order.shop}
                </p>
                <p className="text-sm sm:text-base mt-2">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs capitalize ${statusPillClasses[order.status]}`}
                  >
                    {order.status}
                  </span>
                </p>
                <p className="text-sm sm:text-base mt-2">
                  <span className="font-semibold">Payment Status:</span>{" "}
                  <span className={paymentStatusClasses[order.paymentStatus]}>
                    {order.paymentStatus}
                  </span>
                </p>
              </div>

              <div>
                <p className="text-base sm:text-lg font-semibold">
                  Total:{" "}
                  <span className="text-emerald-600">
                    ${order.total.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-semibold mb-2 text-gray-900">
                Items:
              </h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={`${order.id}-${item.name}`}
                    className={`text-sm sm:text-base text-gray-700 ${index < order.items.length - 1 ? "border-b border-gray-100 pb-2" : ""}`}
                  >
                    {item.name} (x{item.qty}) ${item.amount.toFixed(2)}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-semibold text-gray-900">
                Shipping Address:
              </h4>
              <p className="text-sm sm:text-base text-gray-700">
                {order.shippingAddress.line1}
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                {order.shippingAddress.city}, {order.shippingAddress.zipCode}
              </p>
              <p className="text-sm sm:text-base text-gray-700 flex items-center gap-2">
                <CallIcon fontSize="small" /> {order.shippingAddress.phone}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default OrdersTab;
