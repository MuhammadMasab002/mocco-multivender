import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  ShoppingBag,
  Navigation,
  Copy,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  Phone,
  Mail,
  User,
  FileText,
  ChevronRight,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { getMyOrders } from "../services/store/actions/order";
import toast from "react-hot-toast";

// ─── Status Configuration & Colors ────────────────────────────────────────────
const STATUS_CONFIG = {
  "Pending Payment": {
    color: "bg-amber-100 text-amber-800 border-amber-300",
    badgeBg: "bg-amber-500",
    progressStep: 1,
    desc: "Order created. Waiting for payment confirmation.",
  },
  Processing: {
    color: "bg-blue-100 text-blue-800 border-blue-300",
    badgeBg: "bg-blue-600",
    progressStep: 2,
    desc: "Payment verified. Order is being packed and prepared.",
  },
  "Ready for Pickup": {
    color: "bg-indigo-100 text-indigo-800 border-indigo-300",
    badgeBg: "bg-indigo-600",
    progressStep: 2,
    desc: "Package prepared and waiting for carrier pickup.",
  },
  Shipped: {
    color: "bg-purple-100 text-purple-800 border-purple-300",
    badgeBg: "bg-purple-600",
    progressStep: 3,
    desc: "Package dispatched and in transit to local distribution center.",
  },
  "Out for Delivery": {
    color: "bg-orange-100 text-orange-800 border-orange-300",
    badgeBg: "bg-orange-600",
    progressStep: 4,
    desc: "Courier agent is out for delivery to your address.",
  },
  Delivered: {
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
    badgeBg: "bg-emerald-600",
    progressStep: 5,
    desc: "Package delivered successfully to recipient.",
  },
  "Processing Refund": {
    color: "bg-pink-100 text-pink-800 border-pink-300",
    badgeBg: "bg-pink-600",
    progressStep: 5,
    desc: "Refund request submitted and currently being processed.",
  },
  "Refund Success": {
    color: "bg-teal-100 text-teal-800 border-teal-300",
    badgeBg: "bg-teal-600",
    progressStep: 5,
    desc: "Refund approved and issued successfully.",
  },
  Cancelled: {
    color: "bg-red-100 text-red-800 border-red-300",
    badgeBg: "bg-red-600",
    progressStep: 0,
    desc: "Order has been cancelled.",
  },
  Returned: {
    color: "bg-gray-100 text-gray-800 border-gray-300",
    badgeBg: "bg-gray-600",
    progressStep: 0,
    desc: "Package was returned to seller.",
  },
};

// 5 Main tracking pipeline steps
const TRACKING_STEPS = [
  { id: 1, label: "Order Placed", icon: ShoppingBag, key: "Pending Payment" },
  { id: 2, label: "Processing", icon: Package, key: "Processing" },
  { id: 3, label: "In Transit", icon: Truck, key: "Shipped" },
  {
    id: 4,
    label: "Out for Delivery",
    icon: Navigation,
    key: "Out for Delivery",
  },
  { id: 5, label: "Delivered", icon: CheckCircle2, key: "Delivered" },
];

const TrackOrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, ordersLoading } = useSelector((state) => state.order);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const order = orders.find((o) => o._id === orderId);

  if (ordersLoading && !order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-gray-500">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin" />
        <p className="text-sm font-medium">
          Fetching order tracking information…
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Order Not Found
        </h2>
        <p className="text-gray-500 max-w-md mb-6">
          We couldn't find order tracking details for #{orderId}. It may have
          been removed or does not exist.
        </p>
        <button
          onClick={() => navigate("/my-profile?tab=track-orders")}
          className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition cursor-pointer"
        >
          Back to Track Orders
        </button>
      </div>
    );
  }

  const currentStatusConfig =
    STATUS_CONFIG[order.status] || STATUS_CONFIG["Processing"];
  const currentStepNum = currentStatusConfig.progressStep;
  const isCancelled = order.status === "Cancelled";
  const isReturned = order.status === "Returned";

  // Mock tracking reference & carrier
  const trackingNumber = `MCO-${order._id.slice(-6).toUpperCase()}-TRK`;
  const courierName = "Mocco Express Logistics";

  // Dates computation
  const orderDate = new Date(order.createdAt);
  const formattedOrderDate = orderDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Estimated delivery: 3 to 5 business days after createdAt
  const estDeliveryDate = new Date(orderDate);
  estDeliveryDate.setDate(estDeliveryDate.getDate() + 4);
  const formattedEstDelivery = estDeliveryDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Delivered timestamp or actual timestamp
  const deliveredDate = order.deliveredAt
    ? new Date(order.deliveredAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order._id);
    setCopied(true);
    toast.success("Order ID copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate dynamic activity logs for the timeline based on order status
  const generateActivityLogs = () => {
    const logs = [];

    // Step 1: Placed
    logs.push({
      title: "Order Placed & Confirmed",
      desc: "Your order has been received by Mocco Store.",
      time: formattedOrderDate,
      completed: true,
      icon: ShoppingBag,
    });

    // Step 2: Processing
    if (currentStepNum >= 2 || isCancelled) {
      logs.push({
        title: "Order Processing",
        desc: "Products verified, packed, and assigned to shipping hub.",
        time: new Date(orderDate.getTime() + 2 * 3600000).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
            month: "short",
            day: "numeric",
          },
        ),
        completed: currentStepNum >= 2,
        icon: Package,
      });
    }

    // Step 3: Shipped
    if (currentStepNum >= 3) {
      logs.push({
        title: "Dispatched & In Transit",
        desc: `Handed over to ${courierName}. Package departs sorting facility.`,
        time: new Date(orderDate.getTime() + 18 * 3600000).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
            month: "short",
            day: "numeric",
          },
        ),
        completed: currentStepNum >= 3,
        icon: Truck,
      });
    }

    // Step 4: Out for Delivery
    if (currentStepNum >= 4) {
      logs.push({
        title: "Out for Delivery",
        desc: "Delivery agent is en route to recipient address.",
        time: new Date(orderDate.getTime() + 36 * 3600000).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
            month: "short",
            day: "numeric",
          },
        ),
        completed: currentStepNum >= 4,
        icon: Navigation,
      });
    }

    // Step 5: Delivered
    if (currentStepNum === 5) {
      logs.push({
        title: order.status.includes("Refund")
          ? `Order ${order.status}`
          : "Delivered to Recipient",
        desc: deliveredDate
          ? `Package handed over at ${deliveredDate}`
          : "Package successfully delivered and signed.",
        time: deliveredDate || formattedEstDelivery,
        completed: true,
        icon: CheckCircle2,
      });
    } else if (isCancelled) {
      logs.push({
        title: "Order Cancelled",
        desc: "This order was cancelled before fulfillment.",
        time: formattedOrderDate,
        completed: true,
        isError: true,
        icon: XCircle,
      });
    } else if (!isCancelled && currentStepNum < 5) {
      logs.push({
        title: "Expected Delivery",
        desc: `Estimated delivery date: ${formattedEstDelivery}`,
        time: "Pending",
        completed: false,
        icon: Clock,
      });
    }

    return logs;
  };

  const activityLogs = generateActivityLogs();

  return (
    <div className="bg-gray-50/70 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ── Top Navigation & Actions ─────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={() => navigate("/my-profile?tab=track-orders")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Track Orders
          </button>

          <div className="flex items-center gap-3">
            <Link
              to={`/order/${order._id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 hover:text-gray-900 border border-gray-200 rounded-xl text-xs font-semibold shadow-sm transition hover:shadow cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              View Invoice / Full Details
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 hover:text-gray-900 border border-gray-200 rounded-xl text-xs font-semibold shadow-sm transition hover:shadow cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-gray-500" />
              Need Help?
            </Link>
          </div>
        </div>

        {/* ── Order Track Hero Header Card ─────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-8 relative overflow-hidden">
          {/* Subtle Background Accent Gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-red-500/5 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Header Info Row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-gray-100">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2.5 py-1 rounded-md">
                  Live Order Tracking
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${currentStatusConfig.color}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${currentStatusConfig.badgeBg} animate-pulse`}
                  />
                  {order.status}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-mono tracking-tight">
                  #{order._id}
                </h1>
                <button
                  onClick={handleCopyOrderId}
                  title="Copy Order ID"
                  className="p-1.5 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Placed on{" "}
                <strong className="text-gray-700">{formattedOrderDate}</strong>
              </p>
            </div>

            {/* Estimated Delivery Status Box */}
            <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 sm:px-6 flex items-center gap-4 min-w-70">
              <div className="w-12 h-12 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/20">
                {order.status === "Delivered" ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : isCancelled ? (
                  <XCircle className="w-6 h-6" />
                ) : (
                  <Truck className="w-6 h-6 animate-bounce-slow" />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {order.status === "Delivered"
                    ? "Delivered Date"
                    : isCancelled
                      ? "Order Status"
                      : "Estimated Arrival"}
                </p>
                <p className="text-base sm:text-lg font-bold text-gray-900">
                  {order.status === "Delivered"
                    ? deliveredDate || formattedEstDelivery
                    : isCancelled
                      ? "Order Cancelled"
                      : formattedEstDelivery}
                </p>
                <p className="text-xs text-gray-500">
                  Carrier:{" "}
                  <span className="font-medium text-gray-700">
                    {courierName}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* ── Horizontal Visual Stepper Progress Bar ────────────────── */}
          {!isCancelled && !isReturned && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Order Journey Progress
                </p>
                <p className="text-xs font-bold text-red-600">
                  {currentStepNum === 5
                    ? "100% Completed"
                    : `${Math.round((currentStepNum / 5) * 100)}% Progress`}
                </p>
              </div>

              {/* Stepper Graphic */}
              <div className="relative">
                {/* Background Connecting Line */}
                <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-gray-200 rounded-full z-0" />

                {/* Active Progress Filled Line */}
                <div
                  className="absolute top-1/2 left-6 -translate-y-1/2 h-1 bg-linear-to-r from-red-500 via-amber-500 to-emerald-500 rounded-full z-0 transition-all duration-700"
                  style={{
                    width: `calc(${((currentStepNum - 1) / 4) * 100}% - 12px)`,
                  }}
                />

                {/* Step Nodes */}
                <div className="relative z-10 flex items-center justify-between">
                  {TRACKING_STEPS.map((step) => {
                    const StepIcon = step.icon;
                    const isPassed = currentStepNum > step.id;
                    const isCurrent = currentStepNum === step.id;
                    // const isPending = currentStepNum < step.id;

                    return (
                      <div
                        key={step.id}
                        className="flex flex-col items-center text-center group"
                      >
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                            isPassed
                              ? "bg-emerald-500 text-white ring-4 ring-emerald-100"
                              : isCurrent
                                ? "bg-gray-900 text-white ring-4 ring-red-100 scale-110 shadow-md"
                                : "bg-white text-gray-400 border-2 border-gray-200"
                          }`}
                        >
                          {isPassed ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <StepIcon className="w-5 h-5" />
                          )}
                        </div>
                        <p
                          className={`text-xs font-semibold mt-2 max-w-20 sm:max-w-25 leading-tight ${
                            isCurrent
                              ? "text-gray-900 font-bold"
                              : isPassed
                                ? "text-emerald-700 font-medium"
                                : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Alert Banner for Cancelled / Refunded orders */}
          {isCancelled && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-800 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
              <span>
                This order was cancelled. No further delivery tracking will be
                updated.
              </span>
            </div>
          )}
        </div>

        {/* ── Two Column Main Grid ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left Column: Timeline & Courier Info (2 Columns) ───────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visual Logistics & Tracking Timeline Card */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-red-500" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Activity Timeline
                  </h2>
                </div>
                <span className="text-xs text-gray-400">
                  Tracking Code:{" "}
                  <strong className="font-mono text-gray-700">
                    {trackingNumber}
                  </strong>
                </span>
              </div>

              {/* Vertical Timeline */}
              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                {activityLogs.map((log, index) => {
                  const LogIcon = log.icon;
                  return (
                    <div
                      key={index}
                      className="relative flex items-start gap-4 group"
                    >
                      {/* Timeline Dot Icon */}
                      <div
                        className={`absolute -left-6 sm:-left-8 top-0.5 w-6 sm:w-7 h-6 sm:h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                          log.isError
                            ? "bg-red-500 text-white ring-4 ring-red-100"
                            : log.completed
                              ? "bg-emerald-500 text-white ring-4 ring-emerald-100"
                              : "bg-white text-gray-400 border-2 border-gray-300"
                        }`}
                      >
                        <LogIcon className="w-3.5 h-3.5" />
                      </div>

                      {/* Content Box */}
                      <div className="bg-gray-50/70 border border-gray-100 hover:border-gray-200 rounded-2xl p-4 w-full transition hover:bg-white hover:shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3
                            className={`text-sm font-bold ${
                              log.completed ? "text-gray-900" : "text-gray-400"
                            }`}
                          >
                            {log.title}
                          </h3>
                          <span className="text-xs font-semibold text-gray-500 bg-white px-2.5 py-0.5 rounded-full border border-gray-200">
                            {log.time}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                          {log.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right Column: Shipping & Summary Cards (1 Column) ──────── */}
          <div className="space-y-6">
            {/* Shipping Address Card */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <MapPin className="w-5 h-5 text-red-500" />
                <h2 className="text-base font-bold text-gray-900">
                  Delivery Address
                </h2>
              </div>

              <div className="space-y-2.5 text-sm text-gray-600">
                <div className="flex items-center gap-2 text-gray-900 font-semibold">
                  <User className="w-4 h-4 text-gray-400" />
                  {order.shippingAddress?.fullName ||
                    order.shippingAddress?.name ||
                    "Valued Customer"}
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>
                    {order.shippingAddress?.address1 ||
                      order.shippingAddress?.address}
                    , {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.country || "US"}{" "}
                    {order.shippingAddress?.zipCode ||
                      order.shippingAddress?.zip}
                  </span>
                </div>
                {order.shippingAddress?.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{order.shippingAddress.phoneNumber}</span>
                  </div>
                )}
                {order.shippingAddress?.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{order.shippingAddress.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment & Financial Summary Card */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <CreditCard className="w-5 h-5 text-gray-700" />
                <h2 className="text-base font-bold text-gray-900">
                  Payment Summary
                </h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Payment Method</span>
                  <span className="font-semibold text-gray-900">
                    {order.paymentInfo?.method || "Credit Card"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Payment Status</span>
                  <span
                    className={`font-semibold text-xs px-2.5 py-0.5 rounded-full ${
                      order.paymentInfo?.paymentStatus === "Paid"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {order.paymentInfo?.paymentStatus || "Unpaid"}
                  </span>
                </div>

                <hr className="border-gray-100 my-2" />

                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-800">
                    ${Number(order.totalAmount || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span className="font-medium text-emerald-600">FREE</span>
                </div>

                <div className="flex items-center justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total Amount</span>
                  <span className="text-xl text-red-600">
                    ${Number(order.totalAmount || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Card: Refund / Invoice Buttons */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Quick Actions
              </h3>

              {order.status === "Delivered" && (
                <button
                  onClick={() =>
                    navigate(`/my-profile?tab=refunds&orderId=${order._id}`)
                  }
                  className="w-full py-2.5 px-4 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Request Refund for Order
                </button>
              )}

              <button
                onClick={() => navigate(`/order/${order._id}`)}
                className="w-full py-2.5 px-4 bg-gray-900 text-white hover:bg-gray-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                View Order Details & Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderDetailPage;
