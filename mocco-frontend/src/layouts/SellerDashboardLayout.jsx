import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ShopDashboardHeader from "../components/shopDashboard/ShopDashboardHeader";
import ShopDashboardSidebar from "../components/shopDashboard/ShopDashboardSidebar";
import { dashboardItems } from "../components/shopDashboard/constants/dashboardItems";
import { loadSeller } from "../services/store/actions/seller";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SellerDashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);

  const queryTab = new URLSearchParams(location.search).get("tab");

  // If the path contains /shop-dashboard/order/, we consider the active view to be "orders"
  const isOrderDetail = location.pathname.includes("/shop-dashboard/order/");

  const activeView = isOrderDetail
    ? "orders"
    : dashboardItems.some((item) => item.id === queryTab)
      ? queryTab
      : "dashboard";

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

  const handleTabChange = (tabId) => {
    navigate(
      tabId === "dashboard"
        ? "/shop-dashboard"
        : `/shop-dashboard/?tab=${tabId}`,
      { replace: true },
    );
  };

  return (
    <section className="min-h-screen w-full bg-linear-to-b from-slate-100 via-slate-50 to-white text-slate-900">
      <ShopDashboardHeader
        activeView={activeView}
        onTabChange={handleTabChange}
        sellerId={seller?._id}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr]">
        <ShopDashboardSidebar
          items={dashboardItems}
          activeView={activeView}
          onTabChange={handleTabChange}
          onLogout={handleLogout}
        />

        <main className="p-4 sm:p-6 lg:p-8 xl:p-10">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default SellerDashboardLayout;
