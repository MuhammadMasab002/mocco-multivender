import React from "react";
import ProductCard from "../components/common/products/ProductCard";
import HeroSection from "../components/home/HeroSection";
import FlashSales from "../components/home/FlashSales";
import BestSelling from "../components/home/BestSelling";
import MusicExperienceBanner from "../components/home/MusicExperienceBanner";
import FeatureSection from "../components/home/FeatureSection";
import NewArrivalProducts from "../components/home/NewArrivalProducts";
import { useNavigate } from "react-router-dom";
import CategoriesGrid from "../components/home/CategoriesGrid";
import { productData } from "../static/data.jsx";

const sampleProducts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1656944227421-d0e8de487d9d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "HAVIT HV-G92 Playing shoes",
    price: "$120",
    oldPrice: "205",
    badge: "New",
    discount: "40",
    isWishlisted: "true",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format&fit=crop",
    name: "Sony WH-1000XM4 Headphones",
    price: "$299",
    oldPrice: "440",
    badge: "Hot",
    discount: "26",
    isWishlisted: "false",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80&auto=format&fit=crop",
    name: "RGB Liquid Apple Laptop",
    price: "$120",
    oldPrice: "160",
    badge: "Sale",
    discount: "10",
    isWishlisted: "true",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1752442534054-ef5b221c39a3?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Gaming Mouse",
    price: "$59",
    oldPrice: "111",
    badge: "Limited",
    discount: "21",
    isWishlisted: "false",
  },
];

function Home() {
  const navigate = useNavigate();

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
        <BestSelling
          productData={productData}
          limit={8}
          handleClick={handleClick}
        />
      </section>

      <section className="w-full max-w-7xl my-10 bg-black text-white rounded-lg overflow-hidden">
        <MusicExperienceBanner />
      </section>

      <section className="w-full max-w-7xl px-5 py-8 space-y-8 sm:space-y-12">
        <BestSelling
          productData={productData}
          limit={8}
          handleClick={handleClick}
        />
      </section>

      <section className="w-full max-w-7xl py-10 space-y-8">
        <NewArrivalProducts featureProducts={sampleProducts} />
      </section>

      <section className="w-full max-w-7xl py-4 sm:py-10 md:py-20">
        <FeatureSection />
      </section>
    </div>
  );
}

export default Home;
