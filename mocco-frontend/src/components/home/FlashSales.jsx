// FlashSales.jsx
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../common/products/ProductCard";
import CustomButton from "../common/CustomButton";

const getTimeParts = (sec) => {
  const days = Math.floor(sec / (3600 * 24));
  const hours = Math.floor((sec % (3600 * 24)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = Math.floor(sec % 60);
  return { days, hours, minutes, seconds };
};

const FLASH_SALES_DURATION = 3 * 24 * 3600 + 5 * 3600;

const FlashSales = ({ featureProducts, handleFetchCategories, handleClick }) => {
  const [remaining, setRemaining] = useState(FLASH_SALES_DURATION);
  const targetRef = useRef(null);
  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    targetRef.current = now + FLASH_SALES_DURATION;
    setRemaining(Math.max(0, targetRef.current - now));

    const id = setInterval(() => {
      const nowSec = Math.floor(Date.now() / 1000);
      const newRemaining = Math.max(0, targetRef.current - nowSec);
      setRemaining(newRemaining);
      if (newRemaining <= 0) {
        clearInterval(id);
      }
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } = getTimeParts(remaining);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Flash Sales</h3>
        </div>

        <div className="flex justify-center items-center gap-4">
          <div className="flex gap-3 text-center">
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Minutes", value: minutes },
              { label: "Seconds", value: seconds },
            ].map((t) => (
              <div
                key={t.label}
                className="bg-white p-3 rounded-md shadow w-18 sm:w-20"
              >
                <div className="text-sm text-gray-500">{t.label}</div>
                <div className="text-lg font-semibold text-gray-800">
                  {String(t.value).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
          <CustomButton
            buttonText={"View all"}
            variant={"textDanger"}
            className="hidden md:block"
            onClick={handleFetchCategories}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {featureProducts?.map((p) => (
          <ProductCard
            key={p._id}
            {...p}
            toggleWishlist={() => alert("Addedd to wishlist")}
            onAddToCart={() => alert("Added to cart")}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default FlashSales;
