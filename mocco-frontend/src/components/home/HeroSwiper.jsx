import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Parallax, Pagination, Navigation, Autoplay } from "swiper/modules";
import CustomButton from "../common/CustomButton";

const HeroSwiper = ({ slides }) => {
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fb2c36",
          "--swiper-pagination-bullet-inactive-color": "#fff",
          "--swiper-pagination-bullet-inactive-opacity": "0.8",
        }}
        speed={600}
        parallax={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        navigation={true}
        modules={[Parallax, Pagination, Navigation, Autoplay]}
        className="mySwiper w-full! min-h-96! lg:max-h-96! overflow-hidden rounded-lg"
      >
        <div
          slot="container-start"
          className="parallax-bg"
          data-swiper-parallax="-23%"
        ></div>
        {slides?.map((slide) => (
          <SwiperSlide key={slide?.title}>
            <div
              style={{ background: slide.bgGradient || slide.bgColor }}
              className="flex flex-col md:flex-row items-center justify-between text-white rounded-lg py-8 px-16 w-full h-full"
            >
              {/* Text Section */}
              <div className="order-1 space-y-4 md:w-1/2">
                <p className="text-gray-300 text-sm">{slide.subtitle}</p>
                <h2 className="text-4xl font-bold leading-snug">
                  {slide.title}
                </h2>

                <div className="w-40">
                  <CustomButton
                    variant="secondary"
                    buttonText={slide.buttonText}
                  />
                </div>
              </div>

              {/* Image Section */}
              <div className="order-2 w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
                <img
                  src={slide?.image_url}
                  alt="Hero"
                  className=" md:w-80 object-contain"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroSwiper;
