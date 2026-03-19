import React from "react";
import { brandingData, categoriesData } from "../../static/data";

const CategoriesGrid = ({ handleCategoryClick }) => {
  return (
    <section className="w-full max-w-7xl px-5 py-8 sm:py-12">
      {/* Branding */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 sm:mb-14">
        {brandingData?.map((brand) => (
          <article
            key={brand.id}
            className="bg-white rounded-lg p-5 text-center"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-red-500!">
              {brand.icon}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              {brand.title}
            </h3>
            <p className="mt-1 text-slate-600">{brand.Description}</p>
          </article>
        ))}
      </div>

      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Categories
        </h2>
        <p className="text-slate-600 mt-3">
          Browse our categories to find what you are looking for.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {categoriesData?.map((category) => (
          <article
            key={category.id}
            onClick={() => handleCategoryClick(category.title)}
            className="rounded-lg p-4 sm:p-5 bg-white text-center cursor-pointer hover:shadow-sm transition-shadow duration-200"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 text-black flex items-center justify-center overflow-hidden">
              <img
                src={category.image_Url}
                alt={category.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="mt-4 text-sm sm:text-base font-semibold text-slate-800 leading-snug">
              {category.title}
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;
