import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../components/home/HeroSection";
import FlashSales from "../components/home/FlashSales";
import BestSelling from "../components/home/BestSelling";
import FeatureSection from "../components/home/FeatureSection";
import NewArrivalProducts from "../components/home/NewArrivalProducts";
import { useNavigate } from "react-router-dom";
import CategoriesGrid from "../components/home/CategoriesGrid";
import { productData } from "../static/data.jsx";
import { getAllEvents } from "../services/store/actions/event";
import {
  getAllProducts,
  getFeaturedProducts,
  getBestSellingProducts,
} from "../services/store/actions/product";
import FeatureProducts from "../components/home/FeatureProducts.jsx";
import SponsoredBrands from "../components/home/SponsoredBrands.jsx";
import EventCard from "../components/home/EventCard.jsx";

const MAX_HOME_EVENT_PRODUCTS = 6;
const HOME_EVENT_SECONDARY_LIMIT = 4;
const MOBILE_VISIBLE_SECONDARY_EVENTS = 2;

const scoreEventProduct = (product) => {
  const price = Number(product?.price || 0);
  const discountPrice = Number(product?.discount_price || price);
  const totalSell = Number(product?.total_sell || 0);
  const rating = Number(product?.rating || 0);

  const discountStrength =
    price > 0 ? Math.max(0, ((price - discountPrice) / price) * 100) : 0;

  return discountStrength * 0.45 + totalSell * 0.4 + rating * 0.15;
};

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events: storeEvents } = useSelector((state) => state.event);
  const {
    products: storeProducts,
    featuredProducts,
    bestSellingProducts,
    isLoading: productLoading,
    isFeaturedLoading,
    isBestSellingLoading,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getAllProducts());
    dispatch(getFeaturedProducts());
    dispatch(getBestSellingProducts());
  }, [dispatch]);

  const sourceEvents =
    Array.isArray(storeEvents) && storeEvents.length > 0 ? storeEvents : [];

  const rankedEventProducts = sourceEvents
    .filter((product) => Number(product?.stock || 0) > 0)
    .sort((a, b) => scoreEventProduct(b) - scoreEventProduct(a))
    .slice(0, MAX_HOME_EVENT_PRODUCTS);

  const heroEventProduct = rankedEventProducts?.[0] || null;
  const secondaryEventProducts = rankedEventProducts.slice(
    1,
    1 + HOME_EVENT_SECONDARY_LIMIT,
  );

  // handle category click and navigate
  const handleCategoryClick = (category) => {
    navigate(`products?category=${category.toLowerCase()}`);
  };

  const handleClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  return (
    <div className="w-full h-full justify-center items-center flex flex-col gap-4 my-4">
      {/* <h1 className="text-3xl font-bold text-red-500">Welcome to Mocco Mart</h1> */}
      <HeroSection handleCategoryClick={handleCategoryClick} />
      <CategoriesGrid handleCategoryClick={handleCategoryClick} />

      <section className="w-full max-w-7xl px-5 py-8 space-y-20">
        <FlashSales
          productData={productData}
          limit={8}
          handleClick={handleClick}
        />
        {isBestSellingLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            Loading best-selling products...
          </div>
        ) : bestSellingProducts?.length > 0 ? (
          <BestSelling
            productData={bestSellingProducts}
            limit={8}
            handleClick={handleClick}
          />
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            No best-selling products found right now.
          </div>
        )}
      </section>

      <section className="w-full py-12 px-5">
        <div className="max-w-7xl mx-auto rounded-3xl border border-slate-200 bg-linear-to-br from-white via-rose-50/40 to-slate-50 p-5 sm:p-7 lg:p-9 shadow-xl shadow-slate-200/60">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Event Products
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                Explore curated, time-limited offers from trusted Mocco sellers.
                Each event highlights verified discounts and real-time stock.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/events")}
              className="w-fit rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:text-red-600"
            >
              View all events
            </button>
          </div>

          {heroEventProduct ? (
            <div className="space-y-5">
              <EventCard eventProduct={heroEventProduct} showMoreCta={false} />

              {secondaryEventProducts.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {secondaryEventProducts.map((eventProduct, index) => {
                    const productId =
                      eventProduct?._id || eventProduct?.id || index;
                    const hideOnMobile =
                      index >= MOBILE_VISIBLE_SECONDARY_EVENTS;

                    return (
                      <EventCard
                        key={productId}
                        eventProduct={eventProduct}
                        variant="compact"
                        className={hideOnMobile ? "hidden sm:block" : ""}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              No active event products found right now.
            </div>
          )}
        </div>
      </section>

      <section className="w-full max-w-7xl px-5 py-8 space-y-8 sm:space-y-12">
        {isFeaturedLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            Loading featured products...
          </div>
        ) : (
          <FeatureProducts
            productData={featuredProducts}
            limit={8}
            handleClick={handleClick}
          />
        )}
      </section>

      <section className="w-full max-w-7xl py-10 space-y-8">
        <NewArrivalProducts
          productLoading={productLoading}
          newArrivalProducts={storeProducts}
        />
      </section>

      <section className="w-full max-w-7xl py-4 sm:py-10 md:py-20">
        <FeatureSection />
      </section>

      <SponsoredBrands />
    </div>
  );
}

export default Home;
