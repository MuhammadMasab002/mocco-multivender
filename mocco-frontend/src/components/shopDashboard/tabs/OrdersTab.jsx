import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getShopOrders } from "../../../services/store/actions/order";
import TableShell from "../shared/TableShell";
import TableActionIcon from "../shared/TableActionIcon";
import TruncateTextCell from "../shared/TruncateTextCell";

const STATUS_BADGE = {
  "Pending Payment": "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  "Ready for Pickup": "bg-indigo-100 text-indigo-700",
  Shipped: "bg-purple-100 text-purple-700",
  "Out for Delivery": "bg-orange-100 text-orange-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
  Returned: "bg-gray-100 text-gray-600",
};

const ShopOrdersTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shopOrders, shopOrdersLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getShopOrders());
  }, [dispatch]);

  return (
    <TableShell
      columns={["Order ID", "Total", "Status", "Payment", "Date", "Preview"]}
      productLoading={shopOrdersLoading}
      rows={shopOrders.map((order, i) => {
        const badgeClass =
          STATUS_BADGE[order.status] || "bg-gray-100 text-gray-600";

        return [
          <TruncateTextCell
            key={`oid-${i}`}
            text={order._id}
            maxWidthClass="max-w-32"
            mono
          />,

          <span key={`ototal-${i}`} className="font-semibold text-gray-800">
            ${Number(order.totalAmount || 0).toFixed(2)}
          </span>,

          <span
            key={`ostatus-${i}`}
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${badgeClass}`}
          >
            {order.status}
          </span>,

          <span
            key={`opay-${i}`}
            className={`text-xs font-semibold ${
              order.paymentInfo?.paymentStatus === "Paid"
                ? "text-emerald-600"
                : "text-amber-600"
            }`}
          >
            {order.paymentInfo?.paymentStatus || "—"}
          </span>,

          <span key={`odate-${i}`} className="text-slate-500">
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>,

          <TableActionIcon
            key={`opreview-${i}`}
            type="preview"
            action={() => navigate(`/order/${order._id}`)}
          />,
        ];
      })}
    />
  );
};

export default ShopOrdersTab;
