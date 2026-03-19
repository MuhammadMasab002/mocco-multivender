import React from "react";
import { productData } from "../static/data";
import BestSelling from "../components/home/BestSelling";
import { useNavigate } from "react-router-dom";

const BestSellingPage = () => {
  const navigate = useNavigate();

  const handleClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  return (
    <section className="w-full max-w-7xl px-5 py-8 sm:py-12 mx-auto">
      {/* page header */}
      <div className="text-center mb-12">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
          TOP PERFORMERS
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
          Best Selling
        </h1>
        <div className="w-16 h-1 bg-red-500 mx-auto mb-6"></div>
        <p className="sm:text-lg text-gray-600 font-light">
          Discover the most loved products from our curated selection of trusted
          sellers
        </p>
      </div>

      <BestSelling
        productData={productData}
        handleClick={handleClick}
        limit={null}
        isFullPage={true}
      />
    </section>
  );
};

export default BestSellingPage;
