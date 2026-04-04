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
import { loadUserFail } from "../services/store/slices/userAuthSlice";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileTab from "../components/profile/ProfileTab";
import OrdersTab from "../components/profile/OrdersTab";
import RefundsTab from "../components/profile/RefundsTab";
import TrackOrdersTab from "../components/profile/TrackOrdersTab";
import ChangePasswordTab from "../components/profile/ChangePasswordTab";
import AddressTab from "../components/profile/AddressTab";
import PaymentMethodTab from "../components/profile/PaymentMethodTab";
import LogoutTab from "../components/profile/LogoutTab";

const PROFILE_STORAGE_KEY = "mocco_profile_form";
const ADDRESS_STORAGE_KEY = "mocco_profile_addresses";
const REFUND_STORAGE_KEY = "mocco_profile_refunds";
const PAYMENT_STORAGE_KEY = "mocco_profile_payment_methods";

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

const defaultOrders = [
  {
    id: "A4472E01",
    date: "March 7, 2026",
    shop: "eFlyer",
    paymentMethod: "COD",
    paymentStatus: "pending",
    status: "shipping",
    items: [
      { name: "Enim assumenda ullam", qty: 1, amount: 79 },
      { name: "Gaming pad (mouse pad) Dolore qui", qty: 2, amount: 156 },
    ],
    total: 178,
    shippingAddress: {
      line1: "Deserunt suscipit co",
      city: "Lahore",
      zipCode: "54782",
      phone: "+1 (968) 458-1307",
    },
  },
  {
    id: "A4472D34",
    date: "March 7, 2026",
    shop: "MultiMart",
    paymentMethod: "CARD",
    paymentStatus: "paid",
    status: "processing",
    items: [
      { name: "Wireless speaker", qty: 1, amount: 299 },
      { name: "Bluetooth earbuds", qty: 2, amount: 589 },
    ],
    total: 888,
    shippingAddress: {
      line1: "Block A, Johar Town",
      city: "Lahore",
      zipCode: "54700",
      phone: "+92 300 0000000",
    },
  },
];

const addressTypes = ["Home", "Office", "Other"];
const countries = ["Pakistan", "United Arab Emirates", "Saudi Arabia", "Qatar"];

const statesByCountry = {
  Pakistan: [
    "Punjab",
    "Sindh",
    "Khyber Pakhtunkhwa",
    "Balochistan",
    "Islamabad",
  ],
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah"],
  "Saudi Arabia": ["Riyadh", "Makkah", "Madinah"],
  Qatar: ["Doha", "Al Rayyan", "Al Wakrah"],
};

const initialProfileForm = (user) => ({
  name: user?.name || "",
  email: user?.email || "",
  phoneNumber: user?.phoneNumber || "",
  country: user?.addresses?.[0]?.country || "",
  city: user?.addresses?.[0]?.city || "",
  zipCode: user?.addresses?.[0]?.zipCode || "",
  streetAddress1: user?.addresses?.[0]?.address1 || "",
  streetAddress2: user?.addresses?.[0]?.address2 || "",
  addressType: user?.addresses?.[0]?.addressType || "Home",
  currentPassword: "",
});

const initialAddressForm = {
  country: "",
  state: "",
  city: "",
  zipCode: "",
  streetAddress1: "",
  streetAddress2: "",
  addressType: "Home",
};

const initialPaymentForm = {
  cardType: "VISA",
  cardHolder: "",
  last4: "",
  expiryMonth: "",
  expiryYear: "",
};

const defaultPaymentMethods = [
  {
    id: "visa-default",
    cardType: "VISA",
    cardHolder: "Masab Ashraf",
    last4: "1234",
    expiryMonth: "08",
    expiryYear: "2022",
  },
];

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

const readStoredJson = (storageKey) => {
  try {
    const rawValue = localStorage.getItem(storageKey);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
};

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { tab: routeTab } = useParams();
  const { user } = useSelector((state) => state.user);

  const queryTab = new URLSearchParams(location.search).get("tab");
  const resolvedTab = routeTab || queryTab;
  const activeTab = tabs.some((tab) => tab.id === resolvedTab)
    ? resolvedTab
    : "profile";

  const [profileForm, setProfileForm] = useState(() => {
    const storedProfile = readStoredJson(PROFILE_STORAGE_KEY);
    return storedProfile
      ? { ...initialProfileForm(user), ...storedProfile }
      : initialProfileForm(user);
  });
  const [avatarPreview, setAvatarPreview] = useState(() => {
    const storedProfile = readStoredJson(PROFILE_STORAGE_KEY);
    return storedProfile?.avatarPreview || user?.avatar?.url || "";
  });
  const [orders] = useState(defaultOrders);
  const [refundOrderId, setRefundOrderId] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [refundRequests, setRefundRequests] = useState(
    () => readStoredJson(REFUND_STORAGE_KEY) || [],
  );
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [addresses, setAddresses] = useState(
    () => readStoredJson(ADDRESS_STORAGE_KEY) || [],
  );
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState(initialAddressForm);
  const [paymentMethods, setPaymentMethods] = useState(() => {
    const storedMethods = readStoredJson(PAYMENT_STORAGE_KEY);
    return storedMethods ?? defaultPaymentMethods;
  });
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentForm, setPaymentForm] = useState(initialPaymentForm);

  const derivedProfile = useMemo(
    () => ({
      name: profileForm.name || user?.name || "Guest User",
      email: profileForm.email || user?.email || "example@email.com",
    }),
    [profileForm.email, profileForm.name, user?.email, user?.name],
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

    const fileReader = new FileReader();
    fileReader.onload = () => setAvatarPreview(String(fileReader.result || ""));
    fileReader.readAsDataURL(file);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    if (!profileForm.currentPassword.trim()) {
      alert("Please enter your current password to update profile details.");
      return;
    }

    const payload = { ...profileForm, avatarPreview };
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(payload));
    setProfileForm((prev) => ({ ...prev, currentPassword: "" }));
    alert("Profile updated successfully.");
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (passwordForm.newPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    alert("Password changed successfully.");
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
    localStorage.setItem(REFUND_STORAGE_KEY, JSON.stringify(nextRefunds));
    setRefundOrderId("");
    setRefundReason("");
    alert("Refund request submitted.");
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      setAddressForm((prev) => ({ ...prev, country: value, state: "" }));
      return;
    }

    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();

    if (
      !addressForm.country ||
      !addressForm.state ||
      !addressForm.city ||
      !addressForm.zipCode ||
      !addressForm.streetAddress1
    ) {
      alert("Please fill all required address fields.");
      return;
    }

    const nextAddress = { ...addressForm, id: Date.now() };
    const nextAddresses = [...addresses, nextAddress];
    setAddresses(nextAddresses);
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(nextAddresses));
    setAddressForm(initialAddressForm);
    setShowAddressForm(false);
    alert("Address added successfully.");
  };

  const handleDeleteAddress = (id) => {
    const nextAddresses = addresses.filter((address) => address.id !== id);
    setAddresses(nextAddresses);
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(nextAddresses));
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

    const nextPaymentMethod = {
      ...paymentForm,
      cardHolder: paymentForm.cardHolder.trim(),
      id: Date.now(),
    };

    const nextPaymentMethods = [nextPaymentMethod, ...paymentMethods];
    setPaymentMethods(nextPaymentMethods);
    localStorage.setItem(
      PAYMENT_STORAGE_KEY,
      JSON.stringify(nextPaymentMethods),
    );
    setPaymentForm(initialPaymentForm);
    setShowPaymentForm(false);
    alert("Payment method added successfully.");
  };

  const handleDeletePaymentMethod = (id) => {
    const nextPaymentMethods = paymentMethods.filter(
      (method) => method.id !== id,
    );
    setPaymentMethods(nextPaymentMethods);
    localStorage.setItem(
      PAYMENT_STORAGE_KEY,
      JSON.stringify(nextPaymentMethods),
    );
  };

  const handleLogout = () => {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    localStorage.removeItem(ADDRESS_STORAGE_KEY);
    localStorage.removeItem(REFUND_STORAGE_KEY);
    localStorage.removeItem(PAYMENT_STORAGE_KEY);
    dispatch(loadUserFail("Logged out"));
    navigate("/login", { replace: true });
  };

  const tabHeading = titleByTab[activeTab] || "Profile";

  const renderActiveTab = () => {
    if (activeTab === "profile") {
      return (
        <ProfileTab
          profileForm={profileForm}
          avatarPreview={avatarPreview}
          onAvatarChange={handleAvatarChange}
          onInputChange={handleProfileInputChange}
          onSubmit={handleProfileSubmit}
          countries={countries}
          addressTypes={addressTypes}
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
          countries={countries}
          statesByCountry={statesByCountry}
          addressTypes={addressTypes}
          addresses={addresses}
          onDeleteAddress={handleDeleteAddress}
          onCancelAddressForm={() => {
            setShowAddressForm(false);
            setAddressForm(initialAddressForm);
          }}
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
