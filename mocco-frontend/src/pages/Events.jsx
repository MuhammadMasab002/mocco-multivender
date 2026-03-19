import React from "react";
import { productData } from "../static/data";
import EventCard from "../components/home/EventCard";

const Events = () => {
  const eventProduct = productData?.[1] || productData?.[0] || {};

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-linear-to-b from-slate-50 via-slate-100 to-slate-200/70 py-12 sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute -top-12 -left-12 h-52 w-52 rounded-full bg-rose-100/70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
          <p className="text-xs text-slate-500 uppercase tracking-[0.22em] mb-3">
            Limited Offers
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
            Event Deals
          </h1>
          <div className="w-16 h-0.5 bg-slate-500/70 mx-auto mb-6 rounded-full" />
          <p className="sm:text-lg text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
            Explore time-sensitive offers and grab products before the event
            ends.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <EventCard eventProduct={eventProduct} />
        </div>
      </div>
    </section>
  );
};

export default Events;
