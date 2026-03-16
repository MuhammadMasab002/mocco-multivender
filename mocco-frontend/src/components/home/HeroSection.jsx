import React from "react";
import CategoryMenu from "./CategoryMenu";
import { categoriesData, heroSliderData } from "../../static/data";
import HeroSwiper from "./HeroSwiper";
import { useNavigate } from "react-router-dom";

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

const HeroSection = () => {
  const navigate = useNavigate();

  const categories = categoriesData;

  const handleCategoryClick = (e) => {
    const categoryTitle = e.currentTarget.title;
    console.log("Clicked category:", categoryTitle);
    // Here you can add logic to navigate to the category page or filter products based on the category
    navigate(`products?category=${categoryTitle.toLowerCase()}`);
  };

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
