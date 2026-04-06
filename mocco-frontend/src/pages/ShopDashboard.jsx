import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/common/CustomButton";
import { loadSeller } from "../services/store/actions/seller";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);

  // handle logout API
  const handleLogout = async () => {
    const { data } = await axios.get(`${backendUrl}/shop/logout`, {
      withCredentials: true,
    });
    if (data?.success) {
      alert("Logged out successfully.");
      dispatch(loadSeller());
      navigate("/login", { replace: true });
    }
  };

  return (
    <section className="w-full min-h-[78vh] rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 shadow-[0_16px_60px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-4 sm:gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-red-500 mb-2">
            Seller Portal
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
            Shop Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Welcome back{seller?.name ? `, ${seller.name}` : ""}. Manage your
            shop from here.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-gray-200 p-4 bg-gray-50">
            <p className="text-sm text-gray-500">Seller ID</p>
            <p className="mt-1 text-sm font-semibold text-gray-800 break-all">
              {seller?._id || "-"}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-4 bg-gray-50">
            <p className="text-sm text-gray-500">Shop Email</p>
            <p className="mt-1 text-sm font-semibold text-gray-800 break-all">
              {seller?.email || "-"}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-4 bg-gray-50">
            <p className="text-sm text-gray-500">Role</p>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {seller?.role || "Seller"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-gray-300 p-4 sm:p-6 bg-white">
          <p className="text-gray-700 text-sm sm:text-base">
            This page is protected. Non-logged-in sellers are redirected to shop
            login.
          </p>
          <div className="mt-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
        <div className="flex justify-end mt-10 w-full text-black">
          <CustomButton
            buttonText="Logout"
            // variant="primary"
            onClick={() => handleLogout()}
            className="text-sm px-0! py4! w-16!"
          />
        </div>
      </div>
    </section>
  );
};

export default ShopDashboard;
