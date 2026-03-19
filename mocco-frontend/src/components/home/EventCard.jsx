import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../common/CustomButton";

const EventCard = ({ eventProduct }) => {
  const navigate = useNavigate();

  const imageUrl = eventProduct?.image_Url?.[0]?.url;
  const title = eventProduct?.name || "Event Product";
  const category = eventProduct?.category || "Others";
  const shortDescription =
    eventProduct?.description?.slice(0, 110) || "Limited-time event product";

  const discountPrice = Number(eventProduct?.discount_price || 0);
  const originalPrice = Number(eventProduct?.price || 0);
  const stock = Number(eventProduct?.stock || 0);
  const sold = Number(eventProduct?.total_sell || 1);
  const totalUnits = stock + sold;
  const soldPercent =
    totalUnits > 0 ? Math.min(100, (sold / totalUnits) * 100) : 0;

  const eventStart = "3/7/2026";
  const eventEnd = "3/11/2026";
  const isExpired = true;
  const discountValue = (
    originalPrice - (discountPrice || originalPrice)
  ).toFixed(2);

  const handleSeeDetails = () => {
    if (!eventProduct?.id) return;
    navigate(`/product-detail/${eventProduct.id}`);
  };

  const handleBuyNow = () => {
    navigate("/checkout");
  };

  return (
    <div className="rounded-3xl border border-red-200/80 bg-white/95 shadow-2xl backdrop-blur overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="relative lg:col-span-4 bg-linear-to-b from-white to-slate-100 p-5 sm:p-6 lg:px-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200/80">
          <span className="absolute top-3 left-5 rounded-full bg-rose-500 text-white text-xs font-semibold px-3 py-1.5 shadow-sm">
            -1% OFF
          </span>
          <span className="absolute top-3 right-5 rounded-full bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 shadow-sm">
            {isExpired ? "Expired" : "Live"}
          </span>

          <div className="w-full rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-40 object-contain"
            />
          </div>

          <div className="mt-4 w-full rounded-xl bg-white/85 border border-slate-200 px-4 py-3 text-sm text-slate-600 text-center">
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
              Event Schedule
            </p>
            <div className="flex items-center justify-between gap-4 text-sm">
              <p>
                Start:{" "}
                <span className="font-medium text-slate-700">{eventStart}</span>
              </p>
              <p>
                End:{" "}
                <span className="font-medium text-slate-700">{eventEnd}</span>
              </p>
            </div>
          </div>

          <div className="mt-3 w-full rounded-xl bg-white border border-slate-200 px-4 py-3">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <p className="font-medium">
                Stock: <span className="font-semibold">{stock}</span>
              </p>
              <p className="font-medium">
                Sold: <span className="font-semibold">{sold}</span>
              </p>
            </div>

            <div className="mt-2 h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-red-400 to-red-500"
                style={{ width: `${soldPercent}%` }}
              />
            </div>

            <p className="mt-2 text-center text-xs text-gray-500">
              {sold} sold out of {totalUnits || sold}
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 p-5 sm:p-6 lg:px-8 xl:px-9 flex flex-col">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span className="inline-block w-fit text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
              {category}
            </span>
          </div>

          <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-slate-900 leading-tight">
            {title}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            {shortDescription}
          </p>

          <div className="mt-5 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-center">
            <span className="text-amber-700 text-base font-semibold">
              {isExpired ? "Event Expired" : "Event Live"}
            </span>
          </div>

          <div className="mt-6 flex items-end justify-between gap-3 flex-wrap">
            <div className="flex items-end gap-2">
              <span className="text-lg font-bold text-rose-600 leading-none">
                ${discountPrice || originalPrice}
              </span>
              <span className="text-sm text-gray-400 line-through pb-1">
                ${originalPrice}
              </span>
            </div>
            <span className="text-green-600 text-sm sm:text-base font-semibold bg-green-50 border border-green-100 px-3 py-1 rounded-lg">
              Save ${discountValue}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CustomButton
              buttonText="See details"
              onClick={handleSeeDetails}
              variant="outline"
              className="rounded-xl text-sm sm:text-base"
            />

            <CustomButton
              buttonText="Buy now"
              onClick={handleBuyNow}
              variant="dark"
              className="rounded-xl text-sm sm:text-base"
            />
          </div>

          <div className="flex justify-end items-center gap-4 mt-8">
            <CustomButton
              buttonText={"See more events"}
              variant={"textDanger"}
              className="w-auto! text-sm! py-1! px-2!"
              onClick={() => navigate("/events")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
