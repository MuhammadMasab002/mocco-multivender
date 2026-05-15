import TableShell from "../shared/TableShell";
import TableActionIcon from "../shared/TableActionIcon";
import TruncateTextCell from "../shared/TruncateTextCell";

const AllCouponsTab = ({ sellerCoupons = [], onDeleteCoupon, isLoading }) => {
  if (!sellerCoupons.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
        {isLoading ? "Loading coupons..." : "No coupons found."}
      </div>
    );
  }

  return (
    <TableShell
      columns={[
        "Coupon ID",
        "Coupon Code",
        "Value (%)",
        "Min Amount",
        "Max Amount",
        "Product",
        "Category",
        "Delete",
      ]}
      productLoading={isLoading}
      rows={sellerCoupons.map((item, i) => [
        <TruncateTextCell
          key={`coupon-id-${i}`}
          text={item._id}
          maxWidthClass="max-w-36"
          mono
        />,
        <TruncateTextCell
          key={`coupon-code-${i}`}
          text={item.code}
          maxWidthClass="max-w-36"
        />,
        `${item.value}%`,
        item.minAmount ?? "-",
        item.maxAmount ?? "-",
        <TruncateTextCell
          key={`coupon-product-${i}`}
          text={item.productName || item.product?.name || item.product}
          maxWidthClass="max-w-44"
        />,
        <TruncateTextCell
          key={`coupon-category-${i}`}
          text={item.category}
          maxWidthClass="max-w-40"
        />,
        <TableActionIcon
          key={`coupon-delete-${i}`}
          type="delete"
          action={() => onDeleteCoupon?.(item._id)}
        />,
      ])}
    />
  );
};

export default AllCouponsTab;
