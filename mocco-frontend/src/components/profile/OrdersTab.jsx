import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../../services/store/actions/order";
import { Package, ArrowRight, Loader2 } from "lucide-react";

const STATUS_STYLES = {
  "Pending Payment": "bg-yellow-100 text-yellow-800 border-yellow-200",
  Processing: "bg-blue-100 text-blue-800 border-blue-200",
  "Ready for Pickup": "bg-indigo-100 text-indigo-800 border-indigo-200",
  Shipped: "bg-purple-100 text-purple-800 border-purple-200",
  "Out for Delivery": "bg-orange-100 text-orange-800 border-orange-200",
  Delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
  Returned: "bg-gray-100 text-gray-700 border-gray-200",
};

const PAYMENT_STATUS_COLOR = {
  Paid: "text-emerald-600",
  Unpaid: "text-amber-600",
  Refunded: "text-blue-600",
};

const OrdersTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, ordersLoading, ordersError } = useSelector(
    (state) => state.order,
  );

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (ordersLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
        <Loader2 className="w-7 h-7 animate-spin" />
        <p className="text-sm">Loading your orders…</p>
      </div>
    );
  }

  if (ordersError) {
    return (
      <div className="py-12 text-center text-red-500 text-sm">
        {ordersError}
      </div>
    );
  }

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
          Review your recent purchases and track their status.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl">
          <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-500">No orders yet</p>
          <p className="text-xs text-gray-400 mt-1">
            When you place orders, they'll appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusStyle =
              STATUS_STYLES[order.status] ||
              "bg-gray-100 text-gray-700 border-gray-200";
            const payColor =
              PAYMENT_STATUS_COLOR[order.paymentInfo?.paymentStatus] ||
              "text-gray-600";
            const totalQty =
              order.items?.reduce((s, i) => s + i.quantity, 0) || 0;

            return (
              <article
                key={order._id}
                className="border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-4 border-b border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Order ID
                    </p>
                    <p className="text-sm font-bold text-gray-900 font-mono">
                      #{order._id}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyle}`}
                    >
                      {order.status}
                    </span>
                    <span className={`text-xs font-semibold ${payColor}`}>
                      {order.paymentInfo?.paymentStatus || "—"}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="px-5 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Date</p>
                    <p className="font-medium text-gray-800">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Items</p>
                    <p className="font-medium text-gray-800">
                      {totalQty} item{totalQty !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Payment</p>
                    <p className="font-medium text-gray-800">
                      {order.paymentInfo?.method || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Total</p>
                    <p className="font-bold text-gray-900">
                      ${Number(order.totalAmount || 0).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Items preview */}
                <div className="px-5 pb-4">
                  <p className="text-xs text-gray-400 mb-2">Items</p>
                  <div className="flex flex-wrap gap-2">
                    {order.items?.slice(0, 3).map((item, i) => {
                      const name = item.productId?.name || "Product";
                      const img = item.productId?.images?.[0]?.url;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5"
                        >
                          {img && (
                            <img
                              src={img}
                              alt={name}
                              className="w-5 h-5 rounded object-cover"
                            />
                          )}
                          <span className="text-xs text-gray-700 max-w-30 truncate">
                            {name}
                          </span>
                          <span className="text-xs text-gray-400">
                            ×{item.quantity}
                          </span>
                        </div>
                      );
                    })}
                    {order.items?.length > 3 && (
                      <span className="text-xs text-gray-400 self-center">
                        +{order.items.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* View details CTA */}
                <div className="px-5 pb-4">
                  <button
                    onClick={() => navigate(`/order/${order._id}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 transition cursor-pointer group"
                  >
                    View Details
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

export default OrdersTab;
