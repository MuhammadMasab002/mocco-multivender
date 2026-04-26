import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/animations/5-circle.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full flex justify-center items-center py-10 px-4">
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  );
};

export default Loader;
