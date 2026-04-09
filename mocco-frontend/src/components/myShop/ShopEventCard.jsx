import React from "react";

const ShopEventCard = ({ event }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(15,23,42,0.1)]">
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
          Ends {event.endsOn}
        </span>
      </div>

      <div className="space-y-2 p-5">
        <h3 className="line-clamp-2 text-xl font-semibold text-slate-800">
          {event.title}
        </h3>
        <p className="text-sm text-slate-500">{event.note}</p>
      </div>
    </article>
  );
};

export default ShopEventCard;
