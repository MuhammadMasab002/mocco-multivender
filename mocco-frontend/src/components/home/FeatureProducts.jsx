import React from "react";
import ProductCard from "../common/products/ProductCard";
import CustomButton from "../common/CustomButton";

const FeatureProducts = ({ productData = [], limit = 4, handleClick }) => {
  const products = Array.isArray(productData) ? productData : [];

  const sortedProducts = [...products].sort(
    (a, b) => (b?.total_sell ?? 0) - (a?.total_sell ?? 0),
  );

  const featureProducts =
    typeof limit === "number" ? sortedProducts.slice(0, limit) : sortedProducts;

  return (
    <section className="w-full max-w-7xl px-5 py8 mx-auto">
      {/* page header */}
      <div className="text-center mb-12">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
          Handpicked Selection
        </p>
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Feature Products
        </h1>
        <div className="w-16 h-1 bg-red-500 mx-auto mb-6"></div>
        <p className="text-gray-600 text-lg font-light">
          Discover the most loved products from our curated selection of trusted brands
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(featureProducts) && featureProducts.length > 0 ? (
          featureProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleClick={handleClick}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-4">No products available</p>
        )}
      </div>

      <div className="flex justify-center mt-10">
        <CustomButton
          buttonText={"View all"}
          variant={"textDanger"}
          // onClick={() => navigate("/feature-products")}
        />
      </div>
    </section>
  );
};

export default FeatureProducts;
