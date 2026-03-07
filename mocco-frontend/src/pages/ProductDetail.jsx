import React, { useState } from "react";
import ProductDetailInfo from "../components/common/products/ProductDetailInfo";
import { useParams } from "react-router-dom";
import BestSelling from "../components/home/BestSelling";

export const ProductDetail = () => {
  // get product id from route params
  const { productId } = useParams();

  const [quantity, setQuantity] = useState(1);
  // create a static product detail for now, will replace with api data later
  const productDetail = {
    product: {
      name: "Nike Air Max 270",
      description:
        "All black Nike sneakers, get a free legit check in the SOLESTAGE app now.",
      price: 150.0,
      image:
        "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/1_360x.jpg?v=1688634414",
    },
  };

  if (!productId) return;
  return (
    <>
      <div className="w-full text-black max-w-6xl mx-auto sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: Product Image */}
        <div className="w-full flex justify-center">
          <img
            src={productDetail?.product?.image}
            alt={productDetail?.product?.name}
            className="w-full max-w-md rounded shadow"
          />
        </div>

        {/* RIGHT: Details Info */}
        <ProductDetailInfo
          title={productDetail?.product?.name}
          // rating={4}
          reviews={150}
          description={
            productDetail?.product?.description ??
            "All black Nike sneakers, get a free legit check in the SOLESTAGE app now. "
          }
          price={productDetail?.product?.price}
          colours={["bg-gray-900", "bg-red-500"]}
          sizes={["XS", "S", "M", "L", "XL"]}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
      {/* <div className="w-full h-full justify-center items-center flex flex-col gap-4 my-10">
        <section className="w-full max-w-7xl px-3 sm:px-5 lg:py-10 md:py-8 py-6 space-y-8 sm:space-y-12">
          <BestSelling featureProducts={bestSellingProduct?.products} />
        </section>
      </div> */}
    </>
  );
};

export default ProductDetail;
