import React from "react";
import CustomButton from "../common/CustomButton";

const MusicExperienceBanner = () => {
  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="p-8">
          <span className="text-green-400 font-semibold">Categories</span>
          <h2 className="text-5xl font-bold my-12">
            Enhance Your Music Experience
          </h2>
          <div className="mt-6 flex gap-3">
            <div className="bg-white text-black rounded-full w-15 h-15 flex flex-col items-center justify-center">
              <div className="text-base font-bold">23</div>
              <div className="text-[10px]">hours</div>
            </div>
            <div className="bg-white text-black rounded-full w-15 h-15 flex flex-col items-center justify-center">
              <div className="text-base font-bold">5</div>
              <div className="text-[10px]">Days</div>
            </div>
            <div className="bg-white text-black rounded-full w-15 h-15 flex flex-col items-center justify-center">
              <div className="text-base font-bold">59</div>
              <div className="text-[10px]">Minutes</div>
            </div>
            <div className="bg-white text-black rounded-full w-15 h-15 flex flex-col items-center justify-center">
              <div className="text-base font-bold">35</div>
              <div className="text-[10px]">Seconds</div>
            </div>
          </div>

          <div className="w-40 mt-8">
            <CustomButton
              buttonText={"Buy Now!"}
              variant={"success"}
              className="py-3"
            />
            {/* <a
              href="#"
              className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold"
            >
              
            </a> */}
          </div>
        </div>

        <div className="p-6 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=900&q=80&auto=format&fit=crop"
            alt="headphones"
            className="w-full max-w-md object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default MusicExperienceBanner;
