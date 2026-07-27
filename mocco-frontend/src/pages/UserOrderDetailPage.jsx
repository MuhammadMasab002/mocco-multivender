import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Clock,
  Loader2,
  XCircle,
  Truck,
} from "lucide-react";
import { getMyOrders } from "../services/store/actions/order";
import { backendUrl } from "../components/myShop/utils";
import axios from "axios";

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

// ─── User Order Detail Page ──────────────────────────────────────────────────
const UserOrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, ordersLoading } = useSelector((state) => state.order);
  const [fetchedShop, setFetchedShop] = useState(null);

  // Always fetch user orders on mount to get fresh populated shop info
  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const order = orders.find((o) => o._id === orderId);

  // Extract shop info if populated as object
  const rawShop = order?.items?.[0]?.productId?.shop;
  const populatedShop =
    typeof rawShop === "object" && rawShop !== null && rawShop.name
      ? rawShop
      : null;

  // Fallback: If shop is just a string ID, fetch shop info via API
  useEffect(() => {
    const shopId = typeof rawShop === "string" ? rawShop : rawShop?._id;
    if (!populatedShop && shopId) {
      axios
        .get(`${backendUrl}/shop/info/${shopId}`)
        .then((res) => {
          if (res.data?.shop) {
            setFetchedShop(res.data.shop);
          }
        })
        .catch((err) => {
          console.error("Error fetching shop info:", err);
        });
    }
  }, [rawShop, populatedShop]);

  const sellerInfo = populatedShop || fetchedShop;

  // ─── Loading skeleton ─────────────────────────────────────────────────────────
  if (ordersLoading && orders.length === 0) {
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
                      <div className="w-14 h-14 rounded-xl border border-gray-100 bg-gray-50 shrink-0 overflow-hidden">
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
                      <div className="text-right shrink-0">
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

            {/* Read-only Order Status Panel + Request Refund */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-gray-500" />
                  <h2 className="font-semibold text-gray-800 text-sm">
                    Order Status
                  </h2>
                </div>
                <p className="text-sm text-gray-600">
                  Current status: <strong>{order.status}</strong>
                </p>
              </div>

              {/* Request Refund button for Delivered orders */}
              {order.status === "Delivered" && (
                <button
                  onClick={() =>
                    navigate(`/my-profile?tab=refunds&orderId=${order._id}`)
                  }
                  className="px-5 py-2.5 bg-red-50 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-100 transition whitespace-nowrap cursor-pointer"
                >
                  Request Refund
                </button>
              )}
            </section>
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

            {/* Seller Info (User View) */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h2 className="font-semibold text-gray-800 text-sm mb-3">
                Seller
              </h2>
              <p className="text-sm font-medium text-gray-900">
                {sellerInfo?.name || "—"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {sellerInfo?.email || "—"}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetailPage;
