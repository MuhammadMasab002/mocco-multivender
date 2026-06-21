import React from "react";
import ProductCard from "../common/products/ProductCard";
import CustomButton from "../common/CustomButton";
import { useNavigate } from "react-router-dom";

/**
 * FeatureProducts — displays products that sellers have explicitly marked
 * as featured (isFeatured === true). No heuristic sorting is applied here;
 * the data is already filtered at the API level.
 *
 * Props:
 *  - products  : array of featured products from Redux store
 *  - limit        : max number to display (default 8, pass Infinity for all)
 *  - handleClick  : (productId) => void
 *  - isProductPage: boolean — changes CTA label
 */
const FeatureProducts = ({
  products = [],
  limit = 8,
  handleClick,
  isProductPage = false,
}) => {
  const navigate = useNavigate();

  const productList = Array.isArray(products) ? products : [];

  // Apply optional limit
  const displayedProducts =
    typeof limit === "number" && isFinite(limit)
      ? productList.slice(0, limit)
      : productList;

  return (
    <section className="w-full max-w-7xl px-5 py-8 mx-auto">
      {/* Section header */}
      <div className="text-center mb-12">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
          Handpicked Selection
        </p>
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Featured Products
        </h2>
        <div className="w-16 h-1 bg-red-500 mx-auto mb-6" />
        <p className="text-gray-600 text-lg font-light">
          Products promoted and highlighted by our trusted sellers
        </p>
      </div>

      {/* Product grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
              handleClick={handleClick}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-4 text-center py-8">
            No featured products available right now.
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10">
        <div>
          <CustomButton
            buttonText={isProductPage ? "View all" : "Explore more"}
            variant={"textDanger"}
            onClick={() => navigate("/products?filter=featured")}
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureProducts;
