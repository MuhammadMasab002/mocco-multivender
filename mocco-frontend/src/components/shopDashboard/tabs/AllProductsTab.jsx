import { useState } from "react";
import TableShell from "../shared/TableShell";
import TableActionIcon from "../shared/TableActionIcon";
import TruncateTextCell from "../shared/TruncateTextCell";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  toggleFeatured,
} from "../../../services/store/actions/product";

const AllProductsTab = ({ sellerProducts = [], productLoading = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local optimistic state for isFeatured per product id
  const [featuredState, setFeaturedState] = useState({});

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

  const handleToggleFeatured = async (productId, currentIsFeatured) => {
    // Optimistic update
    setFeaturedState((prev) => ({
      ...prev,
      [productId]: !currentIsFeatured,
    }));
    try {
      await dispatch(toggleFeatured(productId));
    } catch (error) {
      // Revert on failure
      setFeaturedState((prev) => ({
        ...prev,
        [productId]: currentIsFeatured,
      }));
      window.alert(error?.message || "Failed to update featured status");
    }
  };

  const productsToRender = Array.isArray(sellerProducts) ? sellerProducts : [];

  const rows =
    productsToRender.length > 0
      ? productsToRender.map((item, i) => {
          const productId = item?._id;
          // Resolve current isFeatured: prefer local optimistic state, fall back to data
          const isFeatured =
            productId in featuredState
              ? featuredState[productId]
              : !!item?.isFeatured;

          return [
            <TruncateTextCell
              key={`product-id-${i}`}
              text={productId || `69abd7d0${i}88124dd5a`}
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
            /* Featured toggle */
            <TableActionIcon
              key={`product-feature-${i}`}
              type="feature"
              active={isFeatured}
              action={() => handleToggleFeatured(productId, isFeatured)}
            />,
            <TableActionIcon
              key={`product-preview-${i}`}
              type="preview"
              action={() => handlePreviewRoute(productId)}
            />,
            <TableActionIcon
              key={`product-delete-${i}`}
              type="delete"
              action={() => handleDeleteProduct(productId)}
            />,
          ];
        })
      : [
          [
            productLoading
              ? "Loading products..."
              : "No products found for this shop.",
            "-",
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
        "Featured",
        "Preview",
        "Delete",
      ]}
      rows={rows}
      productLoading={productLoading}
    />
  );
};

export default AllProductsTab;
