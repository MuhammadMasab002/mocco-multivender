import React from "react";
import { toTitle } from "./utils";

const ShopEventCard = ({ event }) => {
  const title = toTitle(event?.name || "Event");
  const imageUrl =
    event?.images?.[0]?.url ||
    "https://dummyimage.com/600x400/e2e8f0/64748b.png&text=Event";
  const endsOn = new Date(event?.endDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const status = event?.status || "Running";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden bg-slate-100 sm:h-56">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-80" />

        {/* Status Badge */}
        <div className="absolute left-4 top-4">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide backdrop-blur-md ${
              status === "Running"
                ? "bg-emerald-500/90 text-white shadow-emerald-500/20"
                : "bg-rose-500/90 text-white shadow-rose-500/20"
            } shadow-sm`}
          >
            {status}
          </span>
        </div>

        {/* Date Badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="flex flex-col rounded-xl bg-white/95 px-3 py-1.5 text-center shadow-sm backdrop-blur-md">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Ends On
            </span>
            <span className="text-sm font-bold text-slate-800">{endsOn}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="line-clamp-2 text-lg font-bold leading-tight text-slate-800 group-hover:text-red-500 transition-colors">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {event?.description ||
            "Join this exciting event to get the best deals and exclusive offers!"}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Price
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-slate-800">
                  ${event?.discount_price || event?.price || 0}
                </span>
                {event?.discount_price && (
                  <span className="text-xs font-medium text-slate-400 line-through">
                    ${event?.price}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Sold
              </p>
              <span className="text-sm font-bold text-emerald-600">
                {event?.sold_out || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ShopEventCard;
