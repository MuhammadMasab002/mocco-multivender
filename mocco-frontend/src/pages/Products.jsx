import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/common/products/ProductCard";
import { productData } from "../static/data";

const normalizeCategory = (value = "") => {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
};

const singularizeWords = (value = "") =>
  value
    .split(" ")
    .map((word) =>
      word.endsWith("s") && word.length > 3 ? word.slice(0, -1) : word,
    )
    .join(" ");

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const categoryQuery = queryParams.get("category") || "";

  const queryNorm = normalizeCategory(categoryQuery);
  const querySingular = singularizeWords(queryNorm);

  const products = Array.isArray(productData) ? productData : [];

  const filteredProducts = products?.filter((product) => {
    if (!queryNorm) return true;

    const categoryNorm = normalizeCategory(product?.category || "");
    const categorySingular = singularizeWords(categoryNorm);

    return (
      categoryNorm.includes(queryNorm) ||
      queryNorm.includes(categoryNorm) ||
      categorySingular.includes(querySingular) ||
      querySingular.includes(categorySingular)
    );
  });

  const handleClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  return (
    <section className="w-full max-w-7xl px-5 py-8 sm:py-12 mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
          Product Catalog
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
          Products
        </h1>
        <div className="w-16 h-1 bg-red-500 mx-auto mb-6"></div>
        <p className="sm:text-lg text-gray-600 font-light max-w-3xl mx-auto">
          Explore our complete collection across all categories and find the
          perfect match for your needs.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 rounded-xl border border-gray-200 bg-white p-4">
        <div className="text-gray-700 text-sm sm:text-base">
          Showing{" "}
          <span className="font-semibold">{filteredProducts?.length}</span>{" "}
          product{filteredProducts?.length === 1 ? "" : "s"}
        </div>

        {categoryQuery && (
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-gray-500">Category:</span>
            <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 font-medium capitalize">
              {categoryQuery}
            </span>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {filteredProducts?.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleClick={handleClick}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No products found
          </h2>
          <p className="text-gray-500 mb-5">
            Try changing category or clear filters to see all products.
          </p>
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => navigate("/products")}
          >
            View All Products
          </button>
        </div>
      )}
    </section>
  );
};

export default Products;
