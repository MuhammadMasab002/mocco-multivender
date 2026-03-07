import React from "react";
const About = () => {
  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left image section */}
        <div className="hidden lg:flex items-center justify-center">
          <div
            className="w-full h-140 bg-cover bg-center"
            style={{
              backgroundImage: "url('../about-us.png')",
            }}
          ></div>
        </div>

        {/* Right Form Section */}
        <div className="flex items-center justify-center py-10 px-6">
          <div className="w-full max-w-md space-y-12">
            <h2 className="text-3xl font-bold text-center mb8 text-black">
              Our Story
            </h2>

            <p className="text-center text-gray-500 mb-6">
              Launced in 2015, Mocco Mart is South Asia’s premier online
              shopping makterplace with an active presense in Pakistan.
              Supported by wide range of tailored marketing, data and service
              solutions, Mocco Mart has 10,500 sallers and 300 brands and serves
              3 millioons customers across the region.
            </p>
            <div>
              <p className="text-center text-gray-500 mb-6">
                Mocco Mart has more than 1 Million products to offer, growing at
                a very fast. Mocco Mart offers a diverse assotment in categories
                ranging from consumer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
