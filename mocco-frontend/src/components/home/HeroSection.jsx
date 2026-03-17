import React from "react";
import CategoryMenu from "./CategoryMenu";
import { categoriesData, heroSliderData } from "../../static/data";
import HeroSwiper from "./HeroSwiper";

// const categories = [
//   "Woman's Fashion",
//   "Men's Fashion",
//   "Electronics",
//   "Home & Lifestyle",
//   "Medicine",
//   "Sports & Outdoor",
//   "Baby's & Toys",
//   "Groceries & Pets",
//   "Health & Beauty",
// ];

const HeroSection = ({ handleCategoryClick }) => {
  const categories = categoriesData;

  return (
    <div className="w-full max-w-7xl mx-auto md:px-4 mt-6 flex gap-6">
      <CategoryMenu
        categories={categories}
        handleCategoryClick={handleCategoryClick}
      />
      <HeroSwiper slides={heroSliderData} />
    </div>
  );
};

export default HeroSection;
