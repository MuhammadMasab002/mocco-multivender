import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../common/CustomButton";

const formatMoney = (value) => {
  const numberValue = Number(value || 0);
  if (!Number.isFinite(numberValue)) return "$0";

  return `$${numberValue.toLocaleString()}`;
};

const getCountdownParts = (endDate, nowTime = Date.now()) => {
  const endTime = new Date(endDate).getTime();

  if (!Number.isFinite(endTime)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  const diff = Math.max(0, endTime - nowTime);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: diff <= 0,
  };
};

const formatCountdownValue = (value) => String(value).padStart(2, "0");

const getCardData = (eventProduct = {}) => {
  const imageUrl =
    eventProduct?.images?.[0]?.url ||
    eventProduct?.image_Url?.[0]?.url ||
    "https://dummyimage.com/600x600/f3f4f6/9ca3af.png&text=Event";

  const title = eventProduct?.name || "Event Product";
  const category = eventProduct?.category || "Others";
  const shortDescription =
    eventProduct?.description?.slice(0, 130) || "Limited-time event product";

  const originalPrice = Number(eventProduct?.price || 0);
  const discountPrice = Number(eventProduct?.discount_price || originalPrice);
  const stock = Number(eventProduct?.stock || 0);
  const sold = Number(eventProduct?.total_sell || 0);
  const totalUnits = stock + sold;
  const soldPercent =
    totalUnits > 0 ? Math.min(100, (sold / totalUnits) * 100) : 0;
  const discountPercent =
    originalPrice > 0
      ? Math.max(
          0,
          Math.round(((originalPrice - discountPrice) / originalPrice) * 100),
        )
      : 0;

  return {
    imageUrl,
    title,
    category,
    shortDescription,
    originalPrice,
    discountPrice,
    stock,
    sold,
    totalUnits,
    soldPercent,
    discountPercent,
  };
};

const EventCard = ({
  eventProduct,
  variant = "hero",
  className = "",
  showMoreCta = false,
}) => {
  const navigate = useNavigate();
  const [clockTick, setClockTick] = useState(0);

  const {
    imageUrl,
    title,
    category,
    shortDescription,
    originalPrice,
    discountPrice,
    stock,
    sold,
    totalUnits,
    soldPercent,
    discountPercent,
  } = getCardData(eventProduct);

  const countdownReady = clockTick > 0;
  const countdown = countdownReady
    ? getCountdownParts(eventProduct?.endDate, clockTick)
    : null;

  const isSoldOut = stock <= 0;
  const productId = eventProduct?._id || eventProduct?.id;

  useEffect(() => {
    const syncClock = () => setClockTick(Date.now());
    const initialTimer = window.setTimeout(syncClock, 0);
    const timer = setInterval(() => {
      setClockTick(Date.now());
    }, 1000);

    return () => {
      window.clearTimeout(initialTimer);
      clearInterval(timer);
    };
  }, []);

  const handleSeeDetails = () => {
    if (!productId) return;
    navigate(`/product-detail/${productId}`);
  };

  const handleBuyNow = () => {
    navigate("/checkout");
  };

  if (variant === "compact") {
    return (
      <article
        className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
      >
        <div className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow">
          {discountPercent > 0 ? `-${discountPercent}%` : "Offer"}
        </div>

        <button
          type="button"
          onClick={handleSeeDetails}
          className="w-full text-left"
        >
          <div className="h-48 w-full overflow-hidden bg-slate-100">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <div className="space-y-3 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                {category}
              </span>
            </div>

            <h3 className="text-sm font-semibold text-slate-900  line-clamp-2 leading-6 min-h-12 overflow-hidden">
              {title}
            </h3>

            <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-red-600">
                Time left
              </p>
              <div className="mt-2 grid grid-cols-4 gap-2 text-center">
                {[
                  { label: "Days", value: countdown?.days ?? "--" },
                  { label: "Hours", value: countdown?.hours ?? "--" },
                  { label: "Mins", value: countdown?.minutes ?? "--" },
                  { label: "Secs", value: countdown?.seconds ?? "--" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-white px-2 py-2 shadow-sm">
                    <div className="text-sm font-bold text-slate-900">
                      {typeof item.value === "number" ? formatCountdownValue(item.value) : item.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wide text-slate-500">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-center text-[11px] text-slate-500">
                {countdown?.isExpired ? "Event ended" : countdownReady ? "Ends soon" : "Loading countdown"}
              </p>
            </div>
          </div>
        </button>
      </article>
    );
  }

  return (
    <article
      className={`overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/70 ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="relative lg:col-span-4 bg-linear-to-b from-rose-50 to-white p-5 sm:p-6 lg:px-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200/80">
          <span className="absolute top-3 left-5 rounded-full bg-red-500 text-white text-xs font-semibold px-3 py-1.5 shadow-sm">
            {discountPercent > 0 ? `-${discountPercent}% OFF` : "Event Offer"}
          </span>
          <span
            className={`absolute top-3 right-5 rounded-full text-xs font-semibold px-3 py-1.5 shadow-sm ${
              isSoldOut
                ? "bg-rose-100 text-rose-600"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {isSoldOut ? "Sold Out" : "Live"}
          </span>

          <div className="w-full rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-contain"
            />
          </div>

          <div className="mt-3 w-full rounded-xl bg-white border border-slate-200 px-4 py-3">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <p className="font-medium">
                Sold: <span className="font-semibold">{sold}</span>
              </p>
              <p className="font-medium">
                Stock: <span className="font-semibold">{stock}</span>
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
            <span className="inline-block w-fit text-xs px-3 py-1 rounded-full bg-sky-100 text-sky-700 font-medium">
              {category}
            </span>
          </div>

          <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-slate-900 leading-tight">
            {title}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            {shortDescription}
          </p>

          <div className="mt-5 grid grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: "Days", value: countdown?.days ?? "--" },
              { label: "Hours", value: countdown?.hours ?? "--" },
              { label: "Minutes", value: countdown?.minutes ?? "--" },
              { label: "Seconds", value: countdown?.seconds ?? "--" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-red-100 bg-white px-3 py-3 text-center shadow-sm"
              >
                <div className="text-lg sm:text-xl font-bold text-slate-900">
                  {typeof item.value === "number" ? formatCountdownValue(item.value) : item.value}
                </div>
                <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.16em] text-slate-500">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs sm:text-sm font-medium text-red-600">
          </p>

          <div className="mt-5 rounded-xl bg-linear-to-r from-red-50 via-rose-50 to-orange-50 border border-red-100 px-4 py-3 text-center">
            <span className="text-red-700 text-base font-semibold">
            {countdown?.isExpired
              ? "This event has ended"
              : countdownReady
              ? "Hurry! Limited time left"
                : "Countdown loading"}
            
              
            </span>
          </div>

          <div className="mt-6 flex items-end justify-between gap-3 flex-wrap">
            <div className="flex items-end gap-2">
              <span className="text-lg font-bold text-rose-600 leading-none">
                {formatMoney(discountPrice || originalPrice)}
              </span>
              <span className="text-sm text-gray-400 line-through pb-1">
                {formatMoney(originalPrice)}
              </span>
            </div>
            <span className="text-green-600 text-sm sm:text-base font-semibold bg-green-50 border border-green-100 px-3 py-1 rounded-lg">
              Save{" "}
              {formatMoney(
                Math.max(0, originalPrice - (discountPrice || originalPrice)),
              )}
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
              disabled={isSoldOut}
              className="rounded-xl text-sm sm:text-base"
            />
          </div>

          {showMoreCta && (
            <div className="flex justify-end items-center gap-4 mt-8">
              <CustomButton
                buttonText={"See more events"}
                variant={"textDanger"}
                className="w-auto! text-sm! py-1! px-2!"
                onClick={() => navigate("/events")}
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default EventCard;
