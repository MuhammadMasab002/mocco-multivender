import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../components/home/EventCard";
import { getAllEvents } from "../services/store/actions/event";

const Events = () => {
  const dispatch = useDispatch();
  const { events, isLoading } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const eventProducts = Array.isArray(events) ? events : [];

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
              {/* Explore time-sensitive offers and grab products before the event
            ends. */}
            Explore live promotional offers from Mocco vendors. Each card shows
            pricing, stock movement, and sale progress so shoppers can quickly
            compare active event products.
          </p>
        </div>

        {isLoading && eventProducts.length === 0 ? (
          <div className="max-w-6xl mx-auto rounded-2xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm">
            Loading event products...
          </div>
        ) : eventProducts.length > 0 ? (
          <div className="mx-auto flex max-w-6xl flex-col gap-6">
            {eventProducts.map((eventProduct) => {
              const productId = eventProduct?._id || eventProduct?.id;

              return (
                <EventCard
                  key={productId}
                  eventProduct={eventProduct}
                  showMoreCta={false}
                />
              );
            })}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto rounded-2xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm">
            No active event products found right now.
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
