import React from "react";
import { toTitle } from "./utils";

const ShopProductCard = ({ product }) => {
  const title = toTitle(product?.name);
  const price = product?.discount_price ?? product?.price ?? 0;
  const oldPrice = product?.discount_price ? product?.price : null;
  const rating = Number(product?.rating || 4.2);
  const category = toTitle(product?.category || "General");

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_10px_32px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(15,23,42,0.13)]">
      <div className="relative h-56 overflow-hidden bg-linear-to-br from-slate-50 to-slate-100">
        <img
          src={product?.image_Url?.[0]?.url}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-slate-900/30 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-red-500/40 bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-700 backdrop-blur-sm">
          {category}
        </span>
      </div>

      <div className="space-y-3.5 p-5 sm:p-6">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-800 sm:text-xl">
          {title}
        </h3>

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3.5 py-2.5">
          <div className="flex items-center gap-1.5 text-amber-500">
            <span className="text-sm">
              {"★".repeat(Math.max(1, Math.round(rating)))}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {rating.toFixed(1)}
            </span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
            In Stock
          </span>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold text-emerald-600">${price}</p>
            {oldPrice ? (
              <p className="pb-0.5 text-sm font-medium text-slate-400 line-through">
                ${oldPrice}
              </p>
            ) : null}
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Best Offer
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-100 bg-white p-3.5 text-sm">
          <div className="text-center">
            <p className="text-slate-400">Price</p>
            <p className="font-semibold text-slate-700">${price}</p>
          </div>
          <div className="text-center">
            <p className="text-slate-400">Stock</p>
            <p className="font-semibold text-slate-700">
              {product?.stock ?? 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-slate-400">Sold</p>
            <p className="font-semibold text-slate-700">
              {product?.total_sell ?? 0}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ShopProductCard;
