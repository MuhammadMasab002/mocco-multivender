import React, { useState, useEffect } from "react";
import CustomButton from "../common/CustomButton";

const HeroSlide = ({ subtitle, title, buttonText, img }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-black text-white rounded-lg p-8 w-full h-full">
      {/* Text Section */}
      <div className="order-1 space-y-4 md:w-1/2">
        <p className="text-gray-300 text-sm">{subtitle}</p>
        <h2 className="text-4xl font-bold leading-snug">{title}</h2>

        <div className="w-40">
          <CustomButton variant="secondary" buttonText={buttonText} />
        </div>
      </div>

      {/* Image Section */}
      <div className="order-2 w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
        <img src={img} alt="Hero" className=" md:w-80 object-contain" />
      </div>
    </div>
  );
};

const HeroSlider = ({ slides = [] }) => {
  const [current, setCurrent] = useState(0);

  // Autoplay every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 min-h-100"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full lg:h-100">
            <HeroSlide {...slide} />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-red-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
