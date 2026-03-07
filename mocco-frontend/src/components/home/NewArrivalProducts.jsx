import React from "react";
import CustomButton from "../common/CustomButton";

const NewArrivalProducts = ({ featureProducts }) => {
  const largeItem = featureProducts?.[0];
  const mediumItem = featureProducts?.[1];
  const smallItems = featureProducts?.slice(2);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">
            New Arrival Products
          </h3>
        </div>

        <div className="flex justify-center items-center gap-4">
          <CustomButton buttonText={"View all"} variant={"textDanger"} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LARGE ITEM */}
        <div className="relative rounded overflow-hidden">
          <img
            src={largeItem?.image}
            alt={largeItem?.name}
            className="w-full h-96 object-cover"
          />
          <div className="absolute bottom-6 left-6 bg-white/90 px-6 py-3 rounded shadow space-y-1">
            <h3 className="text-xl font-bold text-black">{largeItem?.name}</h3>
            <p className="text-sm text-gray-700">{largeItem?.description}</p>
            <div className="max-w-28 mt-3">
              <CustomButton
                buttonText={"Shop Now"}
                variant={"danger"}
                onClick={largeItem?.link}
                className="text-sm"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-4">
          {/* MEDIUM ITEM */}
          <div className="relative rounded overflow-hidden h-52">
            <img
              src={mediumItem?.image}
              alt={mediumItem?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <h4 className="text-lg font-bold">{mediumItem?.name}</h4>
              <p className="text-sm">{mediumItem?.description}</p>
              <div className="max-w-24 mt-3">
                <CustomButton
                  buttonText={"Shop Now"}
                  variant={"secondary"}
                  onClick={mediumItem?.link}
                  className="text-xs"
                />
              </div>
            </div>
          </div>

          {/* SMALL ITEMS (LOOP) */}
          <div className="grid grid-cols-2 gap-4">
            {smallItems?.map((item) => (
              <div
                key={item?.id}
                className="relative rounded overflow-hidden h-40"
              >
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 text-white">
                  <h5 className="text-sm font-bold">{item?.name}</h5>
                  <p className="text-xs">{item?.description}</p>
                  <div className="max-w-24 mt-3">
                    <CustomButton
                      buttonText={"Shop Now"}
                      variant={"secondary"}
                      onClick={item?.link}
                      className="text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewArrivalProducts;
