import React from "react";

const statusPillClasses = {
  shipping: "bg-blue-100 text-blue-700",
  processing: "bg-amber-100 text-amber-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

const TrackOrdersTab = ({ orders }) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500 mb-2">
          Tracking
        </p>
        <h2 className="text-xl sm:text-2xl text-gray-900 font-semibold tracking-tight">
          Track Orders
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          See a quick overview of your current order progress.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <article
            key={order.id}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-gray-200 rounded-3xl p-4 sm:p-5 bg-white shadow-sm"
          >
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                Order ID
              </p>
              <p className="sm:text-lg text-gray-900 font-semibold">
                #{order.id}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                Status
              </p>
              <span
                className={`inline-flex text-xs px-3 py-1 rounded-full capitalize ${statusPillClasses[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                Items Qty
              </p>
              <p className="text-xl sm:text-2xl text-gray-900 font-semibold">
                {order.items.reduce((sum, item) => sum + item.qty, 0)}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                Total
              </p>
              <p className="text-xl sm:text-2xl text-emerald-600 font-semibold">
                ${order.total.toFixed(2)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default TrackOrdersTab;
