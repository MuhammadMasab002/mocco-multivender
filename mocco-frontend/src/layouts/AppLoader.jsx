import React from "react";
import Lottie from "react-lottie";
// import animationData from "../assets/animations/24151-ecommerce-animation.json";
import animationData from "../assets/animations/1-loading-animation.json";

const AppLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-screen flex justify-center items-center py-10 px-4">
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
};

export default AppLoader;
