import CustomButton from "../CustomButton";
import CustomFormInput from "../inputs/CustomFormInput";
import { Plus, Minus, Star, ShieldCheck, Truck, Heart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import {
  addToWishlist,
  removeFromWishlist,
  addToGuestWishlistAction,
  removeFromGuestWishlistAction,
} from "../../../services/store/actions/wishlist.js";
import {
  addToCart,
  addToGuestCartAction,
} from "../../../services/store/actions/cart.js";
import { useState } from "react";

const ProductDetailInfo = ({
  title,
  reviews,
  description,
  price,
  quantity,
  setQuantity,
  stock = 100,
  productId,
}) => {
  const dispatch = useDispatch();
  const { isUserAuthenticated } = useSelector((state) => state.user);
  const { ids: wishlistIds } = useSelector((state) => state.wishlist);
  const { isLoading: isCartLoading } = useSelector((state) => state.cart);

  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const isWishlisted = wishlistIds.includes(productId);

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    if (!productId) return;

    if (isWishlistLoading) return;

    if (isUserAuthenticated) {
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
    if (isCartLoading) return;

    if (isUserAuthenticated) {
      try {
        await dispatch(addToCart(productId, quantity));
        toast.success("Added to cart");
      } catch (err) {
        // Error toast handled in thunk
      }
    } else {
      const productObj = {
        _id: productId,
        name: title,
        price,
        discount_price: price - (price * (discount || 0)) / 100, // or whatever discount logic
        stock,
        images,
      };
      dispatch(addToGuestCartAction(productObj, quantity));
    }
  };

  return (
    <div className="w-full lg:w1/2 space-y-6 flex flex-col justify-center">
      {/* Title & Rating */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
          {title}
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full">
            <Star size={16} fill="currentColor" />
            <span className="font-semibold text-amber-600">4.5</span>
            <span className="text-amber-600/80 ml-1">
              ({reviews}
              <span className="hidden sm:inline">Reviews</span>)
            </span>
          </div>
          <span className="h-4 w-px bg-slate-300" />
          <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            <ShieldCheck size={16} />
            <span className="font-semibold">In Stock</span>
          </div>
          <div>
            <button
              onClick={handleWishlistToggle}
              disabled={isWishlistLoading}
              className={`h-9 w-9 flex items-center justify-center rounded border transition-all ${
                isWishlisted
                  ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                  : "bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-red-500"
              }`}
            >
              {isWishlistLoading ? (
                <CircularProgress
                  size={20}
                  className={isWishlisted ? "text-red-500" : "text-slate-400"}
                />
              ) : (
                <Heart
                  size={24}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="flex items-end gap-3 pb-4 border-b border-slate-100">
        <p className="text-4xl sm:text-5xl font-extrabold text-slate-900">
          ${price}
        </p>
        <p className="text-sm font-medium text-slate-500 mb-1.5">
          Free shipping included
        </p>
      </div>

      {/* Description */}
      <p className="text-base text-slate-600 leading-relaxed font-light">
        {description}
      </p>

      {/* Trust Badges */}
      <div className="flex gap-4 py-2">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Truck size={18} className="text-slate-400" />
          Fast Delivery
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <ShieldCheck size={18} className="text-slate-400" />
          Buyer Protection
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="pt-6 space-y-5">
        <div className="flex items-center gap-4">
          <p className="font-semibold text-slate-800 uppercase tracking-wide text-sm">
            Quantity:
          </p>
          <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1 border border-slate-200">
            <button
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              <Minus size={18} />
            </button>
            <div className="w-12">
              <CustomFormInput
                type="text"
                className="text-slate-800 font-semibold px-2! py-1! text-center! bg-transparent border-none! shadow-none! focus:ring-0!"
                value={quantity}
                onChange={(e) =>
                  setQuantity(+e.target.value > 0 ? +e.target.value : 1)
                }
              />
            </div>
            <button
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
              onClick={() =>
                setQuantity(quantity < stock ? quantity + 1 : stock)
              }
            >
              <Plus size={18} />
            </button>
          </div>
          <span className="text-xs text-slate-400">
            {stock} pieces available
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <CustomButton
            buttonText="Buy Now"
            variant="danger"
            className="flex-1 py-3.5 text-base shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all hover:-translate-y-0.5"
          />
          <CustomButton
            buttonText="Add To Cart"
            variant="dark"
            className="flex-1 py-3.5 text-base shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30 transition-all hover:-translate-y-0.5"
            onClick={handleAddToCart}
            disabled={isCartLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInfo;
