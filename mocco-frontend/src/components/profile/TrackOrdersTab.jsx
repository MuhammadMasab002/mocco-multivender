import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../../services/store/actions/order";
import { Loader2, Package, ArrowRight } from "lucide-react";

const STATUS_STYLES = {
  "Pending Payment": "bg-yellow-100 text-yellow-800",
  Processing: "bg-blue-100 text-blue-800",
  "Ready for Pickup": "bg-indigo-100 text-indigo-800",
  Shipped: "bg-purple-100 text-purple-800",
  "Out for Delivery": "bg-orange-100 text-orange-800",
  Delivered: "bg-emerald-100 text-emerald-800",
  Cancelled: "bg-red-100 text-red-800",
  Returned: "bg-gray-100 text-gray-700",
};

const TrackOrdersTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, ordersLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (ordersLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
        <Loader2 className="w-7 h-7 animate-spin" />
        <p className="text-sm">Fetching your orders…</p>
      </div>
    );
  }

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

      {orders.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl">
          <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-500">
            No orders to track
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusStyle =
              STATUS_STYLES[order.status] || "bg-gray-100 text-gray-700";
            const totalQty =
              order.items?.reduce((s, i) => s + i.quantity, 0) || 0;

            return (
              <article
                key={order._id}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-gray-200 rounded-2xl p-4 sm:p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                    Order ID
                  </p>
                  <p className="text-xs sm:text-sm text-gray-900 font-semibold font-mono truncate">
                    #{order._id}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                    Status
                  </p>
                  <span
                    className={`inline-flex text-xs px-3 py-1 rounded-full font-semibold ${statusStyle}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                    Items Qty
                  </p>
                  <p className="text-xl sm:text-2xl text-gray-900 font-semibold">
                    {totalQty}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                    Total
                  </p>
                  <p className="text-xl sm:text-2xl text-emerald-600 font-semibold">
                    ${Number(order.totalAmount || 0).toFixed(2)}
                  </p>
                </div>

                <div className="col-span-2 md:col-span-4 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/order/${order._id}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 transition cursor-pointer group"
                  >
                    View Full Details
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrackOrdersTab;
