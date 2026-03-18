import React from "react";
import ProductCard from "../common/products/ProductCard";
import CustomButton from "../common/CustomButton";
import { useNavigate } from "react-router-dom";

const BestSelling = ({
  productData = [],
  limit = 4,
  isFullPage = false,
  handleClick,
}) => {
  const navigate = useNavigate();
  const products = Array.isArray(productData) ? productData : [];

  const sortedProducts = [...products].sort(
    (a, b) => (b?.total_sell ?? 0) - (a?.total_sell ?? 0),
  );

  const bestSellingProducts =
    typeof limit === "number" ? sortedProducts.slice(0, limit) : sortedProducts;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        {!isFullPage && (
          <>
            <div className="space-y-4">
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
          </>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(bestSellingProducts) &&
        bestSellingProducts.length > 0 ? (
          bestSellingProducts.map((product) => (
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
      {!isFullPage && (
        <div className="flex justify-center mt-10 md:hidden">
          <CustomButton
            buttonText={"View all"}
            variant={"textDanger"}
            onClick={() => navigate("/best-selling")}
          />
        </div>
      )}
    </div>
  );
};

export default BestSelling;
