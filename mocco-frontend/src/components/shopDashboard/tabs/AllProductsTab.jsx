import TableShell from "../shared/TableShell";
import TableActionIcon from "../shared/TableActionIcon";
import TruncateTextCell from "../shared/TruncateTextCell";

const AllProductsTab = ({ sellerProducts }) => {
  return (
    <TableShell
      columns={[
        "Product Id",
        "Name",
        "Price",
        "Stock",
        "Sold Out",
        "Preview",
        "Delete",
      ]}
      rows={sellerProducts.map((item, i) => [
        <TruncateTextCell
          key={`product-id-${i}`}
          text={`69abd7d0${i}88124dd5a`}
          maxWidthClass="max-w-36"
          mono
        />,
        <TruncateTextCell
          key={`product-name-${i}`}
          text={item?.name || "Unnamed Product"}
          maxWidthClass="max-w-48"
        />,
        `US$ ${item?.discount_price ?? item?.price ?? 0}`,
        item?.stock ?? 0,
        item?.total_sell ?? 0,
        <TableActionIcon key={`product-preview-${i}`} type="preview" />,
        <TableActionIcon key={`product-delete-${i}`} type="delete" />,
      ])}
    />
  );
};

export default AllProductsTab;
