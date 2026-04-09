import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MessageCircle, Package } from "lucide-react";
import { toTitle } from "./utils";

const TabButton = ({ icon, label, count, active, onClick }) => {
  const IconComponent = icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
        active
          ? "border-slate-900 bg-slate-900 text-white shadow-[0_10px_25px_rgba(15,23,42,0.25)]"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <IconComponent size={16} />
      <span>{label}</span>
      <span
        className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold ${
          active ? "bg-white text-slate-900" : "bg-slate-100 text-slate-500"
        }`}
      >
        {count}
      </span>
    </button>
  );
};

const MyShopHeader = ({
  displayShop,
  totalProducts,
  totalEvents,
  totalReviews,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white px-4 py-6 text-center shadow-[0_12px_36px_rgba(15,23,42,0.08)] sm:px-8 sm:py-7">
      <p className="text-xs uppercase tracking-[0.2em] text-red-500">
        Shop Dashboard
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {toTitle(displayShop.name)}
      </h1>
      <div className="mx-auto mt-4 h-0.5 w-20 rounded-full bg-slate-300" />

      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        <TabButton
          icon={Package}
          label="Products"
          count={totalProducts}
          active={activeTab === "products"}
          onClick={() => onTabChange("products")}
        />
        <TabButton
          icon={CalendarDays}
          label="Events"
          count={totalEvents}
          active={activeTab === "events"}
          onClick={() => onTabChange("events")}
        />
        <TabButton
          icon={MessageCircle}
          label="Reviews"
          count={totalReviews}
          active={activeTab === "reviews"}
          onClick={() => onTabChange("reviews")}
        />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          to="/shop-dashboard"
          className="inline-flex items-center justify-center rounded-none border border-slate-900 bg-slate-900 px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Shop Dashboard
        </Link>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-none border border-slate-300 bg-white px-8 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
        >
          MultiMart Home
        </Link>
      </div>
    </div>
  );
};

export default MyShopHeader;
