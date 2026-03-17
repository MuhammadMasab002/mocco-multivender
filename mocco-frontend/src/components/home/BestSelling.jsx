// FlashSales.jsx
import React from "react";
import ProductCard from "../common/products/ProductCard";
import CustomButton from "../common/CustomButton";
import { useNavigate } from "react-router-dom";

const BestSelling = ({ productData }) => {
  const navigate = useNavigate();
  const products = productData || [];

  const bestSellingProducts =
    products &&
    products.sort((a, b) => b.total_sell - a.total_sell).slice(0, 8);
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-red-500 pl-4 pr-4 bg-linear-to-r from-red-100 to-white">
            Best Selling
          </h3>
        </div>

        <div className="flex justify-center items-center gap-4">
          <CustomButton
            buttonText={"View all"}
            variant={"textDanger"}
            className="hidden md:block"
            onClick={() => navigate("/best-selling")}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Array.isArray(bestSellingProducts) &&
        bestSellingProducts.length > 0 ? (
          bestSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 col-span-4">No products available</p>
        )}
      </div>
    </div>
  );
};

export default BestSelling;
