// FlashSales.jsx
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../common/products/ProductCard";
import CustomButton from "../common/CustomButton";
import { useNavigate } from "react-router-dom";

const getTimeParts = (sec) => {
  const days = Math.floor(sec / (3600 * 24));
  const hours = Math.floor((sec % (3600 * 24)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = Math.floor(sec % 60);
  return { days, hours, minutes, seconds };
};

const FLASH_SALES_DURATION = 3 * 24 * 3600 + 5 * 3600;

const FlashSales = ({ productData = [], limit = 4, handleClick }) => {
  const navigate = useNavigate();

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <h3
          className="inline-block 
        text-2xl font-bold text-gray-800 border-l-4 border-red-500 pl-4 pr-4 bg-linear-to-r from-red-100 to-white"
        >
          Flash Sales
        </h3>

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
            onClick={() => navigate("/flash-sales")}
          />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productData?.slice(0, limit)?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleClick={handleClick}
          />
        ))}
      </div>

      <div className="flex justify-center mt-10 md:hidden">
        <CustomButton
          buttonText={"View all"}
          variant={"textDanger"}
          onClick={() => navigate("/flash-sales")}
        />
      </div>
    </div>
  );
};

export default FlashSales;
