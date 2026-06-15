import React, { useEffect } from "react";
import BestSelling from "../components/home/BestSelling";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBestSellingProducts } from "../services/store/actions/product";

const BestSellingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bestSellingProducts, isBestSellingLoading: isLoading } = useSelector(
    (state) => state.product,
  );

  useEffect(() => {
    dispatch(getBestSellingProducts());
  }, [dispatch]);

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

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
          Loading best-selling products...
        </div>
      ) : bestSellingProducts.length > 0 ? (
        <BestSelling
          productData={bestSellingProducts}
          handleClick={handleClick}
          limit={null}
          isFullPage={true}
        />
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
          No best-selling products found right now.
        </div>
      )}
    </section>
  );
};

export default BestSellingPage;
