import TableShell from "../shared/TableShell";
import TableActionIcon from "../shared/TableActionIcon";
import TruncateTextCell from "../shared/TruncateTextCell";

const OrdersTab = ({ orders }) => {
  return (
    <TableShell
      columns={[
        "Order ID",
        "Customer",
        "Items",
        "Total",
        "Status",
        "Quantity",
        "Order Date",
        "Preview",
        "Delete",
      ]}
      rows={orders.map((item, i) => [
        <TruncateTextCell
          key={`order-id-${i}`}
          text={item.id}
          maxWidthClass="max-w-36"
          mono
        />,
        <TruncateTextCell
          key={`order-customer-${i}`}
          text={item.customer}
          maxWidthClass="max-w-40"
        />,
        <TruncateTextCell
          key={`order-items-${i}`}
          text={item.items}
          maxWidthClass="max-w-44"
        />,
        `US$ ${item.total.toFixed(2)}`,
        item.status,
        item.qty,
        item.date,
        <TableActionIcon key={`order-preview-${i}`} type="preview" />,
        <TableActionIcon key={`order-delete-${i}`} type="delete" />,
      ])}
    />
  );
};

export default OrdersTab;
