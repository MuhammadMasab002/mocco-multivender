import TableShell from "../shared/TableShell";
import TableActionIcon from "../shared/TableActionIcon";
import TruncateTextCell from "../shared/TruncateTextCell";
import { useEffect } from "react";
import {
  deleteProduct,
  getProducts,
} from "../../../services/store/actions/product";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AllProductsTab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { seller } = useSelector((state) => state.seller);
  const shopId = seller?._id;

  const {
    products,
    isLoading: isProductLoading,
    error: productError,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts(shopId));
  }, [dispatch, shopId]);

  // implement route to product detail page
  const handlePreviewRoute = (productId) => {
    if (!productId) return;
    navigate(`/product-detail/${productId}`);
  };

  // implement delete product functionality
  const handleDeleteProduct = async (productId) => {
    if (!productId) return;
    await dispatch(deleteProduct(productId));
    // Optionally, you can show a success message or handle errors here
    alert("Product deleted successfully!" + productId);
  };

  const rows =
    products?.length > 0
      ? products?.map((item, i) => [
          <TruncateTextCell
            key={`product-id-${i}`}
            text={item?._id || i}
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
            action={() => handlePreviewRoute(item?._id)}
            type="preview"
          />,
          <TableActionIcon
            key={`product-delete-${i}`}
            action={() => handleDeleteProduct(item?._id)}
            type="delete"
          />,
        ])
      : [
          [
            productError && "No products found for this shop.",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
          ],
        ];

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
      productLoading={isProductLoading}
    />
  );
};

export default AllProductsTab;
