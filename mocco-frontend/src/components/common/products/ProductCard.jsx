import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../CustomButton";

const ProductCard = ({ product, handleClick }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [productDetailView, setProductDetailView] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const productImage = product?.image_Url?.[0]?.url;
  const productPrice = Number(product?.discount_price || product?.price || 0);
  const originalPrice = Number(product?.price || 0);
  const rating = Number(product?.rating || product?.shop?.ratings || 0);
  const reviewsCount = product?.reviews?.length || 1;
  const stock = Number(product?.stock || 0);
  const maxQuantity = stock > 0 ? stock : 1;
  const productId = product?._id || product?.id || "N/A";
  const addedDate = product?.createdAt
    ? new Date(product.createdAt).toLocaleDateString()
    : new Date().toLocaleDateString();

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => (prev < maxQuantity ? prev + 1 : maxQuantity));
  };

  const handleModalToggle = (e) => {
    e.stopPropagation();
    setProductDetailView((prev) => !prev);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setProductDetailView(false);
  };

  const renderStars = (value) => {
    const fullStars = Math.round(value);
    return "★".repeat(fullStars) + "☆".repeat(Math.max(0, 5 - fullStars));
  };

  return (
    <>
      <div
        className="relative bg-white shadow-sm hover:shadow-lg hover:shadow-red-100 rounded-lg overflow-hidden cursor-pointer group transition"
        onClick={() => handleClick(product?.id)}
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
              setIsWishlisted(!isWishlisted);
            }}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            {isWishlisted ? (
              <FavoriteIcon className="text-red-500 text-lg" />
            ) : (
              <FavoriteBorderIcon className="text-gray-500 text-lg" />
            )}
          </button>

          {/* View */}
          <button
            className="bg-white w-8 h-8 rounded-full shadow flex items-center justify-center hover:bg-gray-200"
            onClick={handleModalToggle}
            title={productDetailView ? "Hide Details" : "View product details"}
          >
            {productDetailView ? (
              <VisibilityIcon className="text-gray-700 text-lg" />
            ) : (
              <VisibilityOutlinedIcon className="text-gray-700 text-lg" />
            )}
          </button>
        </div>

        {/* Product Image */}
        <div className="relative w-full h-52 flex justify-center items-center overflow-hidden bg-gray-100 text-black">
          <img
            src={productImage}
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
            {product?.shop?.name}
          </p>
          <h3 className="text-sm md:text-base font-medium text-gray-800 line-clamp-2 leading-6 min-h-12 overflow-hidden">
            {product?.name}
          </h3>
          <div className="flex justify-between items-center gap-1 mt-2">
            {/* Price */}
            <div className="flex items-center gap-2">
              {product?.discount_price && (
                <span className="text-red-400 font-bold">
                  ${product.discount_price}
                </span>
              )}
              <span className="text-gray-400 line-through text-sm">
                ${product?.price}
              </span>
            </div>
            {/* sold */}
            <div className="text-green-500 text-sm">
              {product?.total_sell} sold
            </div>
          </div>
        </div>
      </div>

      {productDetailView && (
        <div
          className="fixed inset-0 z-999 bg-black/55 backdrop-blur-[1px] p-4 sm:p-6 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="relative bg-white w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[92vh] overflow-y-auto rounded-2xl">
              <div className="sticky top-0 left-0 right-0 bg-white rounded-t-2xl flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Product Details
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={closeModal}
                  title="Close"
                >
                  <CloseIcon fontSize="small" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-6">
                <div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <img
                      src={productImage}
                      alt={product?.name}
                      className="w-full h-65 sm:h-80 object-contain"
                    />
                  </div>

                  <div className="mt-5 rounded-lg border border-gray-200 p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      Seller Details
                    </h3>
                    <p className="text-sm text-gray-700">
                      Seller Name: {product?.shop?.name || "MultiMart"}
                    </p>
                    <div className="mt-3 max-w-40">
                      <CustomButton
                        buttonText="Send Message"
                        variant="dark"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Message feature coming soon");
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 leading-tight">
                      {product?.name}
                    </h3>
                    <p className="text-xs mt-1 inline-block bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                      {product?.category || "Accessories"}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                    <span className="text-yellow-500 font-semibold">
                      {renderStars(rating)}
                    </span>
                    <span>{rating.toFixed(1)}</span>
                    <span>({reviewsCount} review)</span>
                    <span className="text-green-600">
                      {product?.total_sell || 0} sold
                    </span>
                  </div>

                  <div className="rounded-lg bg-amber-50 p-4 border border-amber-100">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">
                      Customer Reviews
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-amber-600">
                        {rating.toFixed(1)}
                      </span>
                      <span className="text-yellow-500">
                        {renderStars(rating)}
                      </span>
                      <span className="text-sm text-gray-600">
                        Based on {reviewsCount} review
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div className="flex items-center gap-2" key={star}>
                          <span className="text-xs text-gray-500 w-4">
                            {star}
                          </span>
                          <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                            <div
                              className={`h-full ${star === Math.round(rating) ? "bg-amber-500 w-full" : "bg-gray-300 w-0"}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">
                      Description
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {product?.description ||
                        "No description available for this product."}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-gray-900">
                        ${productPrice}
                      </span>
                      {productPrice < originalPrice && (
                        <span className="text-sm line-through text-gray-400">
                          ${originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-green-600 mt-2">
                      Stock: {stock > 0 ? `${stock} available` : "Out of stock"}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-sm text-gray-700">Quantity:</span>
                      <div className="inline-flex items-center border border-gray-200 rounded-md overflow-hidden">
                        <button
                          className="w-8 h-8 text-gray-600 hover:bg-gray-100"
                          onClick={handleDecrease}
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-sm text-gray-800">
                          {quantity}
                        </span>
                        <button
                          className="w-8 h-8 text-gray-600 hover:bg-gray-100"
                          onClick={handleIncrease}
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs text-gray-400">
                        Max: {maxQuantity}
                      </span>
                    </div>

                    <div className="mt-4">
                      <CustomButton
                        buttonText="Add to Cart"
                        variant="dark"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Added to cart");
                        }}
                      />
                    </div>

                    <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                        Product Information
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                        <div>
                          <p className="text-gray-500">Product ID:</p>
                          <p className="text-gray-800 font-medium break-all">
                            {productId}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Added:</p>
                          <p className="text-gray-800 font-medium">
                            {addedDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
