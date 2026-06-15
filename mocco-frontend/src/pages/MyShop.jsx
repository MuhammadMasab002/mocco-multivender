import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loadSeller } from "../services/store/actions/seller";
import { getProducts } from "../services/store/actions/product";
import { getEvents } from "../services/store/actions/event";
import MyShopSidebar from "../components/myShop/MyShopSidebar";
import MyShopHeader from "../components/myShop/MyShopHeader";
import ShopProductCard from "../components/myShop/ShopProductCard";
import ShopEventCard from "../components/myShop/ShopEventCard";
import ShopEmptyState from "../components/myShop/ShopEmptyState";
import EditShopModal from "../components/myShop/EditShopModal";
import { backendUrl, initialFormState } from "../components/myShop/utils";

const MyShop = () => {
  const { sellerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { seller } = useSelector((state) => state.seller);
  const { products: storeProducts } = useSelector((state) => state.product);
  const { events: storeEvents } = useSelector((state) => state.event);

  const [activeTab, setActiveTab] = useState("products");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [shopView, setShopView] = useState(() => initialFormState({}));
  const [editForm, setEditForm] = useState(() => initialFormState({}));
  const [isShopLoading, setIsShopLoading] = useState(true);

  const isOwner = seller?._id === sellerId;

  // Load shop products and events on mount
  useEffect(() => {
    if (sellerId) {
      dispatch(getProducts(sellerId));
      dispatch(getEvents(sellerId));
    }
  }, [dispatch, sellerId]);

  // Load shop profile
  useEffect(() => {
    const fetchShopInfo = async () => {
      try {
        setIsShopLoading(true);
        if (isOwner) {
          setShopView(initialFormState(seller));
          setEditForm(initialFormState(seller));
        } else {
          const { data } = await axios.get(
            `${backendUrl}/shop/info/${sellerId}`,
          );
          setShopView(initialFormState(data?.shop));
        }
      } catch (error) {
        console.error("Failed to fetch shop details", error);
      } finally {
        setIsShopLoading(false);
      }
    };
    if (sellerId) fetchShopInfo();
  }, [sellerId, isOwner, seller]);

  const sellerProducts = Array.isArray(storeProducts) ? storeProducts : [];
  const eventItems = Array.isArray(storeEvents) ? storeEvents : [];

  const reviewItems = useMemo(() => {
    return sellerProducts.flatMap((product) => {
      const reviews = Array.isArray(product?.reviews) ? product.reviews : [];

      return reviews.map((review, index) => ({
        id: `${product?._id || index}-review-${index}`,
        productName: product?.name || "Product",
        comment: review?.comment || "No comment",
        rating: Number(review?.rating || 0),
      }));
    });
  }, [sellerProducts]);

  const totalProducts = sellerProducts.length;
  const totalEvents = eventItems.length;
  const totalReviews = reviewItems.length;

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/shop/logout`, {
        withCredentials: true,
      });

      if (data?.success) {
        window.alert("Logged out successfully.");
        dispatch(loadSeller());
        navigate("/login", { replace: true });
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to logout right now.";
      window.alert(message);
    }
  };

  const openEditModal = () => {
    setEditForm(displayShop);
    setIsEditOpen(true);
  };

  const closeEditModal = () => setIsEditOpen(false);

  const handleEditInput = (event) => {
    const { name, value } = event.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setEditForm((prev) => ({
        ...prev,
        avatarUrl: String(fileReader.result || prev.avatarUrl),
      }));
    };
    fileReader.readAsDataURL(file);
  };

  const handleShopUpdate = (event) => {
    event.preventDefault();

    if (!editForm.name.trim() || !editForm.email.trim()) {
      window.alert("Please provide at least shop name and email.");
      return;
    }

    setShopView({ ...editForm });
    setIsEditOpen(false);
    window.alert("Shop profile updated on this dashboard.");
  };

  if (isShopLoading) {
    return (
      <div className="flex justify-center py-20">Loading shop profile...</div>
    );
  }

  return (
    <>
      <section className="relative w-full rounded-3xl border border-slate-200/90 bg-linear-to-b from-slate-50 via-slate-100 to-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="pointer-events-none absolute -left-10 -top-14 h-52 w-52 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-14 -right-4 h-64 border-4 w-64 rounded-full bg-rose-100/60 blur-3xl" />

        <div className="relative grid grid-cols-1 items-start gap-6 xl:grid-cols-[320px_1fr] xl:gap-7">
          <MyShopSidebar
            displayShop={shopView}
            totalProducts={totalProducts}
            sellerCreatedAt={shopView?.createdAt}
            onOpenEdit={openEditModal}
            onLogout={handleLogout}
            isOwner={isOwner}
          />

          <main className="space-y-10">
            <MyShopHeader
              displayShop={shopView}
              totalProducts={totalProducts}
              totalEvents={totalEvents}
              totalReviews={totalReviews}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              isOwner={isOwner}
            />

            {activeTab === "products" && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {sellerProducts.length > 0 ? (
                  sellerProducts.map((product) => (
                    <ShopProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full">
                    <ShopEmptyState
                      title="No products found"
                      subtitle="This shop hasn't listed any products yet."
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === "events" && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {eventItems.length > 0 ? (
                  eventItems.map((event) => (
                    <ShopEventCard key={event._id} event={event} />
                  ))
                ) : (
                  <div className="col-span-full">
                    <ShopEmptyState
                      title="No events found"
                      subtitle="This shop doesn't have any active events."
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <>
                {reviewItems.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {reviewItems.map((review) => (
                      <article
                        key={review.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.06)]"
                      >
                        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                          {review.productName}
                        </p>
                        <h3 className="mt-3 text-lg font-semibold text-slate-800">
                          {review.comment}
                        </h3>
                        <div className="mt-3 flex items-center gap-2 text-amber-500">
                          <p className="text-sm">
                            {"★".repeat(Math.max(1, Math.round(review.rating)))}
                          </p>
                          <span className="text-xs font-semibold text-slate-500">
                            {review.rating.toFixed(1)} rating
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <ShopEmptyState
                    title="No content available"
                    subtitle="No reviews received yet"
                  />
                )}
              </>
            )}
          </main>
        </div>
      </section>

      <EditShopModal
        isOpen={isEditOpen}
        editForm={editForm}
        onClose={closeEditModal}
        onSubmit={handleShopUpdate}
        onInputChange={handleEditInput}
        onAvatarChange={handleAvatarChange}
      />
    </>
  );
};

export default MyShop;
