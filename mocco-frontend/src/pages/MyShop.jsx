import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loadSeller } from "../services/store/actions/seller";
import { productData } from "../static/data";
import MyShopSidebar from "../components/myShop/MyShopSidebar";
import MyShopHeader from "../components/myShop/MyShopHeader";
import ShopProductCard from "../components/myShop/ShopProductCard";
import ShopEventCard from "../components/myShop/ShopEventCard";
import ShopEmptyState from "../components/myShop/ShopEmptyState";
import EditShopModal from "../components/myShop/EditShopModal";
import {
  backendUrl,
  initialFormState,
  normalize,
  toTitle,
} from "../components/myShop/utils";

const MyShop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const sellerSnapshot = useMemo(() => initialFormState(seller), [seller]);

  const [activeTab, setActiveTab] = useState("products");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [shopView, setShopView] = useState(() => initialFormState(seller));
  const [editForm, setEditForm] = useState(() => initialFormState(seller));

  const hasShopOverride = useMemo(() => {
    return Boolean(shopView.name || shopView.email || shopView.phoneNumber);
  }, [shopView.email, shopView.name, shopView.phoneNumber]);

  const displayShop = hasShopOverride ? shopView : sellerSnapshot;

  const sellerProducts = useMemo(() => {
    const safeProducts = Array.isArray(productData) ? productData : [];
    const sellerName = normalize(displayShop.name);

    if (!sellerName) return safeProducts.slice(0, 4);

    const matched = safeProducts.filter((product) => {
      const productShopName = normalize(product?.shop?.name);
      return (
        productShopName === sellerName ||
        productShopName.includes(sellerName) ||
        sellerName.includes(productShopName)
      );
    });

    return matched.length > 0 ? matched : safeProducts.slice(0, 4);
  }, [displayShop.name]);

  const eventItems = useMemo(() => {
    return sellerProducts.slice(0, 3).map((product, index) => {
      const eventEnd = new Date();
      eventEnd.setDate(eventEnd.getDate() + 7 + index * 5);

      return {
        id: `${product?.id || index}-event`,
        title: toTitle(product?.name),
        image: product?.image_Url?.[0]?.url,
        note: "Promote this product in limited-time flash campaigns.",
        endsOn: eventEnd.toLocaleDateString("en-US"),
      };
    });
  }, [sellerProducts]);

  const reviewItems = useMemo(() => {
    return sellerProducts.flatMap((product) => {
      const reviews = Array.isArray(product?.reviews) ? product.reviews : [];

      return reviews.map((review, index) => ({
        id: `${product?.id || index}-review-${index}`,
        productName: toTitle(product?.name),
        comment: review?.comment || "Great product",
        rating: Number(review?.rating || product?.rating || 4),
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

  return (
    <>
      <section className="relative w-full rounded-3xl border border-slate-200/90 bg-linear-to-b from-slate-50 via-slate-100 to-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="pointer-events-none absolute -left-10 -top-14 h-52 w-52 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-14 -right-4 h-64 border-4 w-64 rounded-full bg-rose-100/60 blur-3xl" />

        <div className="relative grid grid-cols-1 items-start gap-6 xl:grid-cols-[320px_1fr] xl:gap-7">
          <MyShopSidebar
            displayShop={displayShop}
            totalProducts={totalProducts}
            sellerCreatedAt={seller?.createdAt}
            onOpenEdit={openEditModal}
            onLogout={handleLogout}
          />

          <main className="space-y-10">
            <MyShopHeader
              displayShop={displayShop}
              totalProducts={totalProducts}
              totalEvents={totalEvents}
              totalReviews={totalReviews}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {activeTab === "products" && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {sellerProducts.map((product) => (
                  <ShopProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {activeTab === "events" && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {eventItems.map((event) => (
                  <ShopEventCard key={event.id} event={event} />
                ))}
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
