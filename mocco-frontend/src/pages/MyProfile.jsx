import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LockIcon from "@mui/icons-material/Lock";
import PlaceIcon from "@mui/icons-material/Place";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LogoutIcon from "@mui/icons-material/Logout";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileTab from "../components/profile/ProfileTab";
import OrdersTab from "../components/profile/OrdersTab";
import RefundsTab from "../components/profile/RefundsTab";
import TrackOrdersTab from "../components/profile/TrackOrdersTab";
import ChangePasswordTab from "../components/profile/ChangePasswordTab";
import AddressTab from "../components/profile/AddressTab";
import PaymentMethodTab from "../components/profile/PaymentMethodTab";
import LogoutTab from "../components/profile/LogoutTab";
import {
  loadUser,
  updateProfile,
  updatePassword,
  addAddress,
  deleteAddress,
} from "../services/store/actions/user";
import axios from "axios";
import { clearWishlistState } from "../services/store/slices/wishlistSlice";
import { clearCartState } from "../services/store/slices/cartSlice";
import { initGuestWishlist } from "../services/store/actions/wishlist";
import { initGuestCart } from "../services/store/actions/cart";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const tabs = [
  { id: "profile", label: "Profile", icon: AccountCircleIcon },
  { id: "orders", label: "Orders", icon: AssignmentIcon },
  { id: "refunds", label: "Refunds", icon: KeyboardReturnIcon },
  { id: "track-orders", label: "Track Orders", icon: LocalShippingIcon },
  { id: "change-password", label: "Change Password", icon: LockIcon },
  { id: "address", label: "Address", icon: PlaceIcon },
  { id: "payment-method", label: "Payment Method", icon: CreditCardIcon },
  { id: "logout", label: "Logout", icon: LogoutIcon },
];

const addressTypes = ["Home", "Office", "Default"];

const initialProfileForm = (user) => ({
  name: user?.name || "",
  email: user?.email || "",
  phoneNumber: user?.phoneNumber || "",
  currentPassword: "",
});

const initialAddressForm = {
  country: "",
  state: "",
  city: "",
  zipCode: "",
  address1: "",
  address2: "",
  addressType: "Home",
};

const initialPaymentForm = {
  cardType: "VISA",
  cardHolder: "",
  last4: "",
  expiryMonth: "",
  expiryYear: "",
};

const titleByTab = {
  profile: "Profile",
  orders: "Orders",
  refunds: "Refunds",
  "track-orders": "Track Orders",
  "change-password": "Change Password",
  address: "Address",
  "payment-method": "Payment Method",
  logout: "Logout",
};

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { tab: routeTab } = useParams();
  const { user, isLoading: isUserLoading } = useSelector((state) => state.user);

  const queryTab = new URLSearchParams(location.search).get("tab");
  const resolvedTab = routeTab || queryTab;
  const activeTab = tabs.some((tab) => tab.id === resolvedTab)
    ? resolvedTab
    : "profile";

  const [profileForm, setProfileForm] = useState(() =>
    initialProfileForm(user),
  );
  const [avatarPreview, setAvatarPreview] = useState(
    () => user?.avatar?.url || "",
  );
  const [avatarFile, setAvatarFile] = useState(null);
  const [orders] = useState([]);
  const [refundOrderId, setRefundOrderId] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [refundRequests, setRefundRequests] = useState([]);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState(initialAddressForm);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentForm, setPaymentForm] = useState(initialPaymentForm);

  const derivedProfile = useMemo(
    () => ({
      name: profileForm.name || user?.name || "Guest User",
      email: profileForm.email || user?.email || "example@email.com",
      phoneNumber: profileForm.phoneNumber || user?.phoneNumber || "",
    }),
    [
      profileForm.email,
      profileForm.name,
      profileForm.phoneNumber,
      user?.email,
      user?.name,
      user?.phoneNumber,
    ],
  );

  const handleTabChange = (tabId) => {
    navigate(
      tabId === "profile" ? "/my-profile" : `/my-profile/?tab=${tabId}`,
      {
        replace: true,
      },
    );
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file); // Save file for FormData

    const fileReader = new FileReader();
    fileReader.onload = () => setAvatarPreview(String(fileReader.result || ""));
    fileReader.readAsDataURL(file);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!profileForm.currentPassword.trim()) {
      toast.error(
        "Please enter your current password to update profile details.",
      );
      return;
    }

    const formData = new FormData();
    formData.append("name", profileForm.name);
    formData.append("email", profileForm.email);
    formData.append("phoneNumber", profileForm.phoneNumber);
    formData.append("currentPassword", profileForm.currentPassword);
    if (avatarFile) {
      formData.append("file", avatarFile);
    }

    const res = await dispatch(updateProfile(formData));
    if (res.success) {
      toast.success(res.message);
      setProfileForm((prev) => ({ ...prev, currentPassword: "" }));
      setAvatarFile(null);
      dispatch(loadUser());
    } else {
      toast.error(res.message);
    }
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    const payload = {
      oldPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    };

    const res = await dispatch(updatePassword(payload));
    if (res.success) {
      toast.success(res.message);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      toast.error(res.message);
    }
  };

  const handleRefundSubmit = (e) => {
    e.preventDefault();

    if (!refundOrderId || !refundReason.trim()) {
      alert("Please select an order and provide a refund reason.");
      return;
    }

    const selectedOrder = orders.find((order) => order.id === refundOrderId);
    if (!selectedOrder) return;

    const alreadyRequested = refundRequests.some(
      (request) => request.orderId === selectedOrder.id,
    );

    if (alreadyRequested) {
      alert("Refund request already submitted for this order.");
      return;
    }

    const nextRefund = {
      id: Date.now(),
      orderId: selectedOrder.id,
      shop: selectedOrder.shop,
      total: selectedOrder.total,
      status: "pending",
      reason: refundReason,
      createdAt: new Date().toLocaleDateString(),
    };

    const nextRefunds = [nextRefund, ...refundRequests];
    setRefundRequests(nextRefunds);
    setRefundOrderId("");
    setRefundReason("");
    toast.success("Refund request submitted.");
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      setAddressForm((prev) => ({ ...prev, country: value, state: "" }));
      return;
    }

    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();

    if (
      !addressForm.country ||
      !addressForm.state ||
      !addressForm.city ||
      !addressForm.zipCode ||
      !addressForm.address1
    ) {
      toast.error("Please fill all required address fields.");
      return;
    }

    const res = await dispatch(addAddress(addressForm));
    if (res.success) {
      toast.success(res.message);
      setAddressForm(initialAddressForm);
      setShowAddressForm(false);
      dispatch(loadUser());
    } else {
      toast.error(res.message);
    }
  };

  const handleDeleteAddress = async (id) => {
    const res = await dispatch(deleteAddress(id));
    if (res.success) {
      toast.success(res.message);
      dispatch(loadUser());
    } else {
      toast.error(res.message);
    }
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "last4") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 4);
      setPaymentForm((prev) => ({ ...prev, [name]: digitsOnly }));
      return;
    }

    if (name === "expiryMonth") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 2);
      setPaymentForm((prev) => ({ ...prev, [name]: digitsOnly }));
      return;
    }

    if (name === "expiryYear") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 4);
      setPaymentForm((prev) => ({ ...prev, [name]: digitsOnly }));
      return;
    }

    setPaymentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPaymentMethod = (e) => {
    e.preventDefault();

    if (
      !paymentForm.cardHolder.trim() ||
      paymentForm.last4.length !== 4 ||
      paymentForm.expiryMonth.length !== 2 ||
      paymentForm.expiryYear.length !== 4
    ) {
      alert(
        "Please enter a valid card holder, last 4 digits, and expiry date.",
      );
      return;
    }

    const month = Number(paymentForm.expiryMonth);
    if (month < 1 || month > 12) {
      alert("Expiry month must be between 01 and 12.");
      return;
    }

    const newMethod = {
      id: Date.now(),
      ...paymentForm,
    };
    const nextMethods = [...paymentMethods, newMethod];
    setPaymentMethods(nextMethods);
    setPaymentForm(initialPaymentForm);
    setShowPaymentForm(false);
    toast.success("Payment method added.");
  };

  const handleDeletePaymentMethod = (id) => {
    const nextMethods = paymentMethods.filter((method) => method.id !== id);
    setPaymentMethods(nextMethods);
  };

  // handle logout API
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      const res = await axios.get(`${backendUrl}/user/logout`, {
        withCredentials: true,
      });

      toast.success(res.data.message || "Logged out successfully.");
      dispatch(loadUser());

      // clear logged-in user wishlist/cart
      dispatch(clearWishlistState());
      dispatch(clearCartState());
      // initialize guest wishlist/cart
      dispatch(initGuestWishlist());
      dispatch(initGuestCart());

      navigate("/login", { replace: true });
    }
  };

  const tabHeading = titleByTab[activeTab] || "Profile";

  const renderActiveTab = () => {
    if (activeTab === "profile") {
      return (
        <ProfileTab
          profileForm={profileForm}
          derivedProfile={derivedProfile}
          avatarPreview={avatarPreview}
          onAvatarChange={handleAvatarChange}
          onInputChange={handleProfileInputChange}
          onSubmit={handleProfileSubmit}
          isLoading={isUserLoading}
        />
      );
    }

    if (activeTab === "orders") {
      return <OrdersTab orders={orders} />;
    }

    if (activeTab === "refunds") {
      return (
        <RefundsTab
          orders={orders}
          refundRequests={refundRequests}
          refundOrderId={refundOrderId}
          setRefundOrderId={setRefundOrderId}
          refundReason={refundReason}
          setRefundReason={setRefundReason}
          onSubmit={handleRefundSubmit}
        />
      );
    }

    if (activeTab === "track-orders") {
      return <TrackOrdersTab orders={orders} />;
    }

    if (activeTab === "change-password") {
      return (
        <ChangePasswordTab
          passwordForm={passwordForm}
          onInputChange={handlePasswordInputChange}
          onSubmit={handlePasswordSubmit}
          isLoading={isUserLoading}
        />
      );
    }

    if (activeTab === "address") {
      return (
        <AddressTab
          showAddressForm={showAddressForm}
          setShowAddressForm={setShowAddressForm}
          addressForm={addressForm}
          onInputChange={handleAddressInputChange}
          onAddAddress={handleAddAddress}
          addressTypes={addressTypes}
          addresses={user?.addresses || []}
          onDeleteAddress={handleDeleteAddress}
          onCancelAddressForm={() => {
            setShowAddressForm(false);
            setAddressForm(initialAddressForm);
          }}
          isLoading={isUserLoading}
        />
      );
    }

    if (activeTab === "payment-method") {
      return (
        <PaymentMethodTab
          paymentMethods={paymentMethods}
          showPaymentForm={showPaymentForm}
          paymentForm={paymentForm}
          onInputChange={handlePaymentInputChange}
          onAddPaymentMethod={handleAddPaymentMethod}
          onDeletePaymentMethod={handleDeletePaymentMethod}
          onCancelPaymentForm={() => {
            setShowPaymentForm(false);
            setPaymentForm(initialPaymentForm);
          }}
          onShowPaymentForm={() => setShowPaymentForm(true)}
        />
      );
    }

    return <LogoutTab onLogout={handleLogout} />;
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-gray-50 via-white to-red-50/40">
      <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 p-4 sm:p-6 lg:p-8">
        <ProfileSidebar
          userName={derivedProfile.name}
          userEmail={derivedProfile.email}
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <main className="min-w-0">
          <div className="px-5 sm:px-8 py-6 border border-gray-200 bg-white/85 backdrop-blur rounded-3xl shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-600 mb-3">
                My Account
              </div>
              <p className="text-sm sm:text-base text-gray-600 mt-1 max-w-2xl">
                Manage your {tabHeading.toLowerCase()} settings and preferences.
              </p>
            </div>
            <p className="text-sm sm:text-base text-gray-500 sm:text-right">
              Profile <span className="mx-1">/</span>
              <span className="text-gray-900 font-semibold"> {tabHeading}</span>
            </p>
          </div>

          <div className="py-4 sm:py-6">
            <section className="bg-white border border-gray-200 rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-4 sm:p-6 lg:p-8">
              {renderActiveTab()}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyProfile;
