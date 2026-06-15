import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/common/products/ProductCard";
import {
  getAllProducts,
  getFeaturedProducts,
} from "../services/store/actions/product";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filter = searchParams.get("filter");
  const isFeaturedFilter = filter === "featured";

  const {
    products: storeProducts,
    featuredProducts,
    isLoading: productLoading,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
    if (
      isFeaturedFilter &&
      (!featuredProducts || featuredProducts.length === 0)
    ) {
      dispatch(getFeaturedProducts());
    }
  }, [dispatch, isFeaturedFilter, featuredProducts?.length]);

  // Show products based on filter
  const products = isFeaturedFilter
    ? Array.isArray(featuredProducts)
      ? featuredProducts
      : []
    : Array.isArray(storeProducts)
      ? storeProducts
      : [];

  const pageTitle = isFeaturedFilter ? "Featured Products" : "Products";
  const pageDescription = isFeaturedFilter
    ? "Discover the most loved products promoted by our trusted sellers."
    : "Explore our complete collection across all categories and find the perfect match for your needs.";

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
          {pageTitle}
        </h1>
        <div className="w-16 h-1 bg-red-500 mx-auto mb-6" />
        <p className="sm:text-lg text-gray-600 font-light max-w-3xl mx-auto">
          {pageDescription}
        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleClick={handleClick}
          />
        ))}
      </div>

      {products.length === 0 && !productLoading && (
        <div className="text-center text-gray-500 mt-10">
          No products found.
        </div>
      )}
    </section>
  );
};

export default Products;
