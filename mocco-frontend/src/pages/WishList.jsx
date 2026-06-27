import React, { useEffect, useState } from "react";
import ProductCard from "../components/common/products/ProductCard";
import CustomButton from "../components/common/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import {
  clearGuestWishlistAction,
  getGuestWishlist,
  clearWishlist,
} from "../services/store/actions/wishlist.js";
import { useNavigate } from "react-router-dom";
import { HeartCrack, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserAuthenticated } = useSelector((state) => state.user);
  const { items: authWishlistItems, isLoading: isAuthLoading } = useSelector(
    (state) => state.wishlist,
  );
  const { ids: wishlistIds } = useSelector((state) => state.wishlist);
  const { products } = useSelector((state) => state.product);

  // Guest State
  const [guestItems, setGuestItems] = useState([]);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    // Fetch full product details for guests since local storage only has IDs
    const fetchGuestProducts = async () => {
      if (isUserAuthenticated) return;

      const guestIds = getGuestWishlist();
      if (guestIds.length === 0) {
        setGuestItems([]);
        return;
      }

      setIsGuestLoading(true);
      try {
        // Fetch all products to find the guest items.
        // In a real production app with many products, you'd create an endpoint like `POST /products/bulk`
        const allProducts = products || []; // fallback to products from redux if available
        const matchedProducts = allProducts.filter((p) =>
          guestIds.includes(p._id),
        );

        // Wrap them in a structure similar to the DB wishlist to keep the UI consistent
        const mappedGuestItems = matchedProducts.map((p) => ({
          _id: `guest_${p._id}`,
          productId: p,
        }));

        setGuestItems(mappedGuestItems);
      } catch (error) {
        console.error("Failed to fetch guest products", error);
        toast.error("Failed to load local wishlist items");
      } finally {
        setIsGuestLoading(false);
      }
    };

    fetchGuestProducts();
  }, [isUserAuthenticated, dispatch, products, wishlistIds]);

  const isLoading = isUserAuthenticated ? isAuthLoading : isGuestLoading;

  // The backend returns { wishlist: [ { _id, productId: { ...productDetails } }, ... ] }
  const displayItems = isUserAuthenticated
    ? authWishlistItems || []
    : guestItems;

  const handleClearWishlist = async () => {
    if (isUserAuthenticated) {
      try {
        setIsClearing(true);
        await dispatch(clearWishlist());
        toast.success("Wishlist cleared");
      } catch (err) {
        toast.error("Failed to clear wishlist", err);
      } finally {
        setIsClearing(false);
      }
    } else {
      dispatch(clearGuestWishlistAction());
      toast.success("Local wishlist cleared");
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Your Wishlist
            </h1>
            {!isLoading && (
              <span className="bg-slate-200 text-slate-700 py-1 px-3 rounded-full text-sm font-semibold">
                {displayItems.length} items
              </span>
            )}
          </div>

          {displayItems.length > 0 && (
            <div>
              <CustomButton
                buttonText={isClearing ? "Clearing..." : "Clear Wishlist"}
                variant="outline"
                className="text-red-500 border-red-200 hover:bg-red-50"
                onClick={handleClearWishlist}
                disabled={isClearing}
              />
            </div>
          )}
        </div>

        {/* State: Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p>Loading your wishlist...</p>
          </div>
        )}

        {/* State: Empty */}
        {!isLoading && displayItems.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <HeartCrack className="w-12 h-12 text-slate-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-slate-500 max-w-md mb-8">
              Looks like you haven't added anything to your wishlist yet.
              Explore our products and find something you love!
            </p>
            <CustomButton
              buttonText="Explore Products"
              variant="dark"
              onClick={() => navigate("/products")}
              className="px-8"
            />
          </div>
        )}

        {/* State: Has Items */}
        {!isLoading && displayItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayItems.map((item) => {
              const product = item.productId;
              if (!product) return null; // Safe guard
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  handleClick={handleProductClick}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
