import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CustomButton from "../CustomButton";

const ProductCard = ({ product }) => {
  return (
    <div
      className="relative bg-white shadow-sm hover:shadow-lg hover:shadow-red-100 rounded-lg overflow-hidden cursor-pointer group transition"
      onClick={() => alert("Navigate to product details")}
    >
      {/* Discount Badge */}
      {product?.discount && (
        <span className="absolute top-3 left-3 z-20 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
          -{product.discount}%
        </span>
      )}

      {/* Wishlist + View Icons */}
      <div className="absolute right-3 top-3 flex flex-col gap-2 z-10">
        {/* Wishlist */}
        <button
          className="bg-white w-8 h-8 rounded-full shadow flex items-center justify-center hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            alert("Added to wishlist");
          }}
        >
          <FavoriteIcon className="text-red-500 text-lg" />
          {/* {isWishlisted ? (
            <FavoriteIcon className="text-red-500 text-lg" />
          ) : (
            <FavoriteBorderIcon className="text-gray-500 text-lg" />
          )} */}
        </button>

        {/* View */}
        <button
          className="bg-white w-8 h-8 rounded-full shadow flex items-center justify-center hover:bg-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          <RemoveRedEyeIcon className="text-gray-700 text-lg" />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative w-full h-52 flex justify-center items-center overflow-hidden bg-gray-100">
        <img
          src={product?.image_Url[0].url}
          alt={product?.name}
          className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        {/* Add to Cart (Hover Button) */}
        <div
          className="absolute bottom-0 left-0 right-0 w-ful text-white text-center text-sm opacity-0 
        group-hover:opacity-100 transition-opacity ease-in-out duration-300"
        >
          <CustomButton
            buttonText="Add to Cart"
            variant="dark"
            className="rounded-none"
            onClick={(e) => {
              e.stopPropagation();
              alert("Added to cart");
            }}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="px-3 py-4 mb-2">
        {/* brand -> shop */}
        <p className="text-sm text-blue-500 mb-1 truncate">
          {product?.shop.name}
        </p>
        <h3 className="text-sm md:text-base font-medium text-gray-800 line-clamp-2 leading-6 min-h-12 overflow-hidden">
          {product?.name}
        </h3>
        <div className="flex justify-between items-center gap-1 mt-2">
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold">${product?.price}</span>
            {product?.discount_price && (
              <span className="text-gray-400 line-through text-sm">
                ${product.discount_price}
              </span>
            )}
          </div>
          {/* sold */}
          <div className="text-green-500 text-sm">
            {product?.total_sell} sold
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
