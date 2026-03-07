import React from "react";
import CategoryMenu from "./CategoryMenu";
import HeroSlider from "./HeroSlider";

const HeroSection = () => {
  const categories = [
    "Woman's Fashion",
    "Men's Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby's & Toys",
    "Groceries & Pets",
    "Health & Beauty",
  ];

  const slides = [
    {
      subtitle: "iPhone 14 Series",
      title: "Up to 10% off Voucher",
      buttonText: "Shop Now →",
      img: "https://images.unsplash.com/photo-1758578938566-c986f710feb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      subtitle: "Smart Electronics",
      title: "Latest Gadgets Collection",
      buttonText: "Shop Deals →",
      img: "https://images.unsplash.com/photo-1713056878930-c5604da9acfd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      subtitle: "Exclusive Sale",
      title: "Up to 50% OFF on Accessories",
      buttonText: "Explore →",
      img: "https://images.unsplash.com/photo-1760901627502-4969155b3330?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto md:px-4 mt-6 flex gap-6">
      <CategoryMenu categories={categories} />
      <HeroSlider slides={slides} />
    </div>
  );
};

export default HeroSection;
