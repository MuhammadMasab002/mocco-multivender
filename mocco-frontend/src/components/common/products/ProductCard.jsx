import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomButton from "../CustomButton";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  addToWishlist,
  removeFromWishlist,
  addToGuestWishlistAction,
  removeFromGuestWishlistAction,
} from "../../../services/store/actions/wishlist.js";
import { CircularProgress } from "@mui/material";
import {
  addToCart,
  addToGuestCartAction,
} from "../../../services/store/actions/cart.js";
import ProductDetailViewModal from "./ProductDetailViewModal.jsx";

const ProductCard = ({ product, handleClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isUserAuthenticated } = useSelector((state) => state.user);
  const { ids: wishlistIds } = useSelector((state) => state.wishlist);

  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

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

  const isWishlisted = wishlistIds.includes(productId);

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();

    if (isWishlistLoading) return;

    if (isUserAuthenticated) {
      // Authenticated User flow
      try {
        setIsWishlistLoading(true);
        if (isWishlisted) {
          await dispatch(removeFromWishlist(productId));
          toast.success("Removed from wishlist");
        } else {
          await dispatch(addToWishlist(productId));
          toast.success("Added to wishlist");
        }
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to update wishlist",
        );
      } finally {
        setIsWishlistLoading(false);
      }
    } else {
      // Guest User flow
      if (isWishlisted) {
        dispatch(removeFromGuestWishlistAction(productId));
        toast.success("Removed from local wishlist");
      } else {
        dispatch(addToGuestWishlistAction(productId));
        toast.success("Added to local wishlist (Login to sync)");
      }
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (isUserAuthenticated) {
      try {
        await dispatch(addToCart(productId, 1));
        toast.success("Added to cart");
      } catch (err) {
        // Error toast is handled by the action
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to add to cart",
        );
      }
    } else {
      dispatch(addToGuestCartAction(product, 1));
      toast.success("Added to local cart (Login to sync)");
    }
  };

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

  const handleNavigateToShop = (e) => {
    e.stopPropagation();
    if (product?.shop?._id) {
      navigate(`/shop/${product.shop._id}`);
    }
  };

  return (
    <>
      <div
        className="relative bg-white shadow-sm hover:shadow-lg hover:shadow-red-100 rounded-lg overflow-hidden cursor-pointer group transition"
        onClick={() => handleClick(product?._id)}
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
            onClick={handleWishlistToggle}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            disabled={isWishlistLoading}
          >
            {isWishlistLoading ? (
              <CircularProgress size={16} className="text-gray-500" />
            ) : isWishlisted ? (
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
              onClick={handleAddToCart}
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

      {/* Product Detail VIEW Modal */}
      {productDetailView && (
        <ProductDetailViewModal
          product={product}
          productImage={productImage}
          productPrice={productPrice}
          originalPrice={originalPrice}
          rating={rating}
          reviewsCount={reviewsCount}
          stock={stock}
          maxQuantity={maxQuantity}
          productId={productId}
          //
          renderStars={renderStars}
          addedDate={addedDate}
          quantity={quantity}
          onClose={closeModal}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onAddToCart={handleAddToCart}
          onNavigateToShop={handleNavigateToShop}
        />
      )}
    </>
  );
};

export default ProductCard;
