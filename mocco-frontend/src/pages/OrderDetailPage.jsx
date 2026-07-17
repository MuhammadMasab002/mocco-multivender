import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Clock,
  ChevronDown,
  Loader2,
  CheckCircle2,
  XCircle,
  Truck,
} from "lucide-react";
import {
  getMyOrders,
  getShopOrders,
  updateOrderStatus,
} from "../services/store/actions/order";
import toast from "react-hot-toast";

// ─── Status configuration ─────────────────────────────────────────────────────
const STATUS_CONFIG = {
  "Pending Payment": {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    dot: "bg-yellow-400",
  },
  Processing: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    dot: "bg-blue-400",
  },
  "Ready for Pickup": {
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    dot: "bg-indigo-400",
  },
  Shipped: {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    dot: "bg-purple-400",
  },
  "Out for Delivery": {
    color: "bg-orange-100 text-orange-800 border-orange-200",
    dot: "bg-orange-400",
  },
  Delivered: {
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    dot: "bg-emerald-400",
  },
  Cancelled: {
    color: "bg-red-100 text-red-800 border-red-200",
    dot: "bg-red-400",
  },
  Returned: {
    color: "bg-gray-100 text-gray-700 border-gray-200",
    dot: "bg-gray-400",
  },
};

const VALID_TRANSITIONS = {
  Processing: ["Ready for Pickup", "Shipped", "Cancelled"],
  "Ready for Pickup": ["Shipped", "Out for Delivery", "Cancelled"],
  Shipped: ["Out for Delivery", "Delivered", "Cancelled"],
  "Out for Delivery": ["Delivered", "Cancelled"],
  Delivered: ["Returned"],
  "Pending Payment": ["Processing", "Cancelled"],
  Cancelled: [],
  Returned: [],
};

const PAYMENT_STATUS_COLOR = {
  Paid: "text-emerald-600",
  Unpaid: "text-amber-600",
  Refunded: "text-blue-600",
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Processing"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { seller, isSellerAuthenticated } = useSelector(
    (state) => state.seller,
  );
  const {
    orders,
    shopOrders,
    ordersLoading,
    shopOrdersLoading,
    updateStatusLoading,
  } = useSelector((state) => state.order);

  // Decide which list to look in — seller or user
  const isSeller = isSellerAuthenticated && !!seller;
  const orderList = isSeller ? shopOrders : orders;
  const listLoading = isSeller ? shopOrdersLoading : ordersLoading;

  // Fetch the appropriate list if empty
  useEffect(() => {
    if (orderList.length === 0) {
      if (isSeller) {
        dispatch(getShopOrders());
      } else {
        dispatch(getMyOrders());
      }
    }
  }, [isSeller, orderList.length, dispatch]);

  const order = orderList.find((o) => o._id === orderId);

  // ── Status update (seller only) ──────────────────────────────────────────────
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    if (order) setSelectedStatus(order.status);
  }, [order]);

  console.log("OrderDetailPage: order", order);

  const allowedNext = order ? VALID_TRANSITIONS[order.status] || [] : [];

  const handleStatusUpdate = async () => {
    if (!selectedStatus || selectedStatus === order?.status) {
      toast.error("Please choose a different status to update.");
      return;
    }
    await dispatch(updateOrderStatus(orderId, selectedStatus));
  };

  // ─── Loading skeleton ─────────────────────────────────────────────────────────
  if (listLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm">Loading order details…</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-gray-800 mb-1">
            Order not found
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            This order doesn't exist or you don't have access.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const addr = order.shippingAddress || {};

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              Order Details
            </p>
            <h1 className="text-lg font-bold text-gray-900 font-mono">
              #{order._id}
            </h1>
          </div>
          <div className="ml-auto">
            <StatusBadge status={order.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left Column ──────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-500" />
                <h2 className="font-semibold text-gray-800 text-sm">
                  Order Items ({order.items?.length || 0})
                </h2>
              </div>
              <div className="divide-y divide-gray-50">
                {order.items?.map((item, idx) => {
                  const product = item.productId;
                  const name = product?.name || "Product";
                  const img = product?.images?.[0]?.url;
                  const price =
                    item.price ??
                    product?.discount_price ??
                    product?.price ??
                    0;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 px-5 py-4"
                    >
                      {/* Thumbnail */}
                      <div className="w-14 h-14 rounded-xl border border-gray-100 bg-gray-50 flex-shrink-0 overflow-hidden">
                        {img ? (
                          <img
                            src={img}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-5 h-5 text-gray-300" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-gray-900">
                          ${(price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400">
                          ${price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Shipping Address */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-gray-500" />
                <h2 className="font-semibold text-gray-800 text-sm">
                  Shipping Address
                </h2>
              </div>
              {addr && Object.keys(addr).length > 0 ? (
                <div className="text-sm text-gray-600 space-y-1">
                  {addr.addressType && (
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md font-medium mb-2">
                      {addr.addressType}
                    </span>
                  )}
                  <p className="font-medium text-gray-900">
                    {addr.address1}
                    {addr.address2 ? `, ${addr.address2}` : ""}
                  </p>
                  <p>
                    {addr.city}
                    {addr.state ? `, ${addr.state}` : ""} {addr.zipCode}
                  </p>
                  <p>{addr.country}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-400">No address recorded.</p>
              )}
            </section>

            {/* Seller: Status Update Panel */}
            {isSeller && (
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="w-4 h-4 text-gray-500" />
                  <h2 className="font-semibold text-gray-800 text-sm">
                    Update Order Status
                  </h2>
                </div>

                {allowedNext.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    This order is in a final state (
                    <strong>{order.status}</strong>) and cannot be updated
                    further.
                  </p>
                ) : (
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Dropdown */}
                    <div className="relative flex-1 min-w-[200px]">
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white pr-9 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition cursor-pointer"
                      >
                        <option value={order.status} disabled>
                          Current: {order.status}
                        </option>
                        {allowedNext.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Update button */}
                    <button
                      onClick={handleStatusUpdate}
                      disabled={
                        updateStatusLoading || selectedStatus === order.status
                      }
                      className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                    >
                      {updateStatusLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />{" "}
                          Updating…
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Update Status
                        </>
                      )}
                    </button>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* ── Right Column (Order Summary) ──────────────────────────────── */}
          <div className="space-y-5">
            {/* Payment Info */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-4 h-4 text-gray-500" />
                <h2 className="font-semibold text-gray-800 text-sm">Payment</h2>
              </div>
              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Method</dt>
                  <dd className="font-medium text-gray-900">
                    {order.paymentInfo?.method || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Status</dt>
                  <dd
                    className={`font-semibold ${PAYMENT_STATUS_COLOR[order.paymentInfo?.paymentStatus] || "text-gray-700"}`}
                  >
                    {order.paymentInfo?.paymentStatus || "—"}
                  </dd>
                </div>
                {order.paymentInfo?.transactionId && (
                  <div className="pt-2 border-t border-gray-50">
                    <dt className="text-gray-400 text-xs mb-0.5">
                      Transaction ID
                    </dt>
                    <dd className="text-xs font-mono text-gray-600 break-all">
                      {order.paymentInfo.transactionId}
                    </dd>
                  </div>
                )}
              </dl>
            </section>

            {/* Order Summary */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-gray-500" />
                <h2 className="font-semibold text-gray-800 text-sm">
                  Order Summary
                </h2>
              </div>
              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Placed on</dt>
                  <dd className="font-medium text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </dd>
                </div>
                {order.paidAt && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Paid on</dt>
                    <dd className="font-medium text-gray-900">
                      {new Date(order.paidAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </dd>
                  </div>
                )}
                {order.deliveredAt && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Delivered on</dt>
                    <dd className="font-medium text-emerald-600">
                      {new Date(order.deliveredAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-gray-500">Items</dt>
                  <dd className="font-medium text-gray-900">
                    {order.items?.length || 0}
                  </dd>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                  <dt className="font-semibold text-gray-900">Total</dt>
                  <dd className="text-lg font-bold text-gray-900">
                    ${Number(order.totalAmount || 0).toFixed(2)}
                  </dd>
                </div>
              </dl>
            </section>

            {/* User info (seller view only) */}
            {isSeller && order.user && (
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <h2 className="font-semibold text-gray-800 text-sm mb-3">
                  Customer
                </h2>
                <p className="text-sm font-medium text-gray-900">
                  {order.user.name || "—"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {order.user.email || "—"}
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
