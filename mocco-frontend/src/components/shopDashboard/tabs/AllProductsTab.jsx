import TableShell from "../shared/TableShell";
import TableActionIcon from "../shared/TableActionIcon";
import TruncateTextCell from "../shared/TruncateTextCell";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../services/store/actions/product";

const AllProductsTab = ({ sellerProducts = [], productLoading = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePreviewRoute = (productId) => {
    if (!productId) return;
    navigate(`/product-detail/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    if (!productId) return;

    const shouldDelete = window.confirm("Delete this product?");
    if (!shouldDelete) return;

    try {
      await dispatch(deleteProduct(productId));
    } catch (error) {
      window.alert(error?.message || "Failed to delete product");
    }
  };

  const productsToRender = Array.isArray(sellerProducts) ? sellerProducts : [];

  const rows =
    productsToRender.length > 0
      ? productsToRender.map((item, i) => [
          <TruncateTextCell
            key={`product-id-${i}`}
            text={item?._id || `69abd7d0${i}88124dd5a`}
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
          <TableActionIcon
            key={`product-preview-${i}`}
            type="preview"
            action={() => handlePreviewRoute(item?._id)}
          />,
          <TableActionIcon
            key={`product-delete-${i}`}
            type="delete"
            action={() => handleDeleteProduct(item?._id)}
          />,
        ])
      : [[
          productLoading
            ? "Loading products..."
            : "No products found for this shop.",
          "-",
          "-",
          "-",
          "-",
          "-",
          "-",
        ]];


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
      rows={rows}
      productLoading={productLoading}
    />
  );
};

export default AllProductsTab;
