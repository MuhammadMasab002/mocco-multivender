import TableShell from "../shared/TableShell";
import TableActionIcon from "../shared/TableActionIcon";
import TruncateTextCell from "../shared/TruncateTextCell";

const AllCouponsTab = ({ sellerCoupons }) => {
  return (
    <TableShell
      columns={[
        "Coupon Id",
        "Name",
        "Value (%)",
        "Min Amount",
        "Max Amount",
        "Product",
        "Category",
        "Delete",
      ]}
      rows={sellerCoupons.map((item, i) => [
        <TruncateTextCell
          key={`coupon-id-${i}`}
          text={item.id}
          maxWidthClass="max-w-36"
          mono
        />,
        <TruncateTextCell
          key={`coupon-name-${i}`}
          text={item.name}
          maxWidthClass="max-w-40"
        />,
        `${item.value}%`,
        item.minAmount,
        item.maxAmount,
        <TruncateTextCell
          key={`coupon-product-${i}`}
          text={item.product}
          maxWidthClass="max-w-44"
        />,
        item.category,
        <TableActionIcon key={`coupon-delete-${i}`} type="delete" />,
      ])}
    />
  );
};

export default AllCouponsTab;
