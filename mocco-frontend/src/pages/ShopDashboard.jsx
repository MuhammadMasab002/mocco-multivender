import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Gift,
  Inbox,
  LayoutDashboard,
  LogOut,
  Package,
  Plus,
  ShoppingBag,
  Tag,
  Ticket,
  Wallet,
} from "lucide-react";
import axios from "axios";
import ShopDashboardContent from "../components/shopDashboard/ShopDashboardContent";
import { productData } from "../static/data";
import { loadSeller } from "../services/store/actions/seller";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const formatMoney = (amount = 0) => `$${Number(amount || 0).toFixed(2)}`;

const dashboardItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: "blue" },
  { id: "all-products", label: "All Products", icon: Package, color: "emerald" },
  { id: "create-product", label: "Create Product", icon: Plus, color: "violet" },
  { id: "all-events", label: "All Events", icon: Tag, color: "orange" },
  { id: "create-event", label: "Create Event", icon: CalendarDays, color: "sky" },
  { id: "all-coupons", label: "All Coupons", icon: Ticket, color: "pink" },
  { id: "create-coupon", label: "Create Coupon", icon: Gift, color: "indigo" },
  { id: "orders", label: "Orders", icon: ShoppingBag, color: "teal" },
  { id: "withdraw", label: "Withdraw Money", icon: Wallet, color: "amber" },
  { id: "inbox", label: "Shop Inbox", icon: Inbox, color: "slate" },
];

const colorTokens = {
  blue: "border-blue-100 bg-blue-50 text-blue-600",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-600",
  violet: "border-violet-100 bg-violet-50 text-violet-600",
  orange: "border-orange-100 bg-orange-50 text-orange-600",
  sky: "border-sky-100 bg-sky-50 text-sky-600",
  pink: "border-pink-100 bg-pink-50 text-pink-600",
  indigo: "border-indigo-100 bg-indigo-50 text-indigo-600",
  teal: "border-teal-100 bg-teal-50 text-teal-600",
  amber: "border-amber-100 bg-amber-50 text-amber-600",
  slate: "border-slate-100 bg-slate-50 text-slate-600",
};

const pakistanBanks = [
  "UBL - United Bank Limited",
  "HBL - Habib Bank Limited",
  "NBP - National Bank of Pakistan",
  "MCB - MCB Bank Limited",
  "ABL - Allied Bank Limited",
  "Standard Chartered Bank Pakistan",
  "Faysal Bank Limited",
  "Bank Alfalah Limited",
  "Askari Bank Limited",
  "JS Bank Limited",
  "Soneri Bank Limited",
  "Bank Al Habib Limited",
  "Dubai Islamic Bank Pakistan Limited",
  "Meezan Bank Limited",
  "BankIslami Pakistan Limited",
];

const makeEventDate = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toLocaleDateString("en-GB");
};

const SidebarItem = ({ item, active, onClick }) => {
  const IconComponent = item.icon;
  const activeColor = colorTokens[item.color] || colorTokens.slate;

  return (
    <button
      type="button"
      onClick={() => onClick(item.id)}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left text-base font-semibold transition ${
        active
          ? `${activeColor} shadow-[0_8px_20px_rgba(15,23,42,0.08)]`
          : "border-transparent text-slate-600 hover:bg-slate-50"
      }`}
    >
      <IconComponent size={22} />
      <span>{item.label}</span>
      {active && <span className="ml-1 text-lg leading-none">•</span>}
    </button>
  );
};

const TopRightIcon = ({ icon, colorClass = "text-slate-500" }) => {
  const IconComponent = icon;

  return (
    <button
      type="button"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent transition hover:border-slate-200 hover:bg-slate-50"
    >
      <IconComponent size={20} className={colorClass} />
    </button>
  );
};

const ShopDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);

  const [withdrawInput, setWithdrawInput] = useState("4");
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: "bank-1",
      bankName: "UBL - United Bank Limited",
      accountHolderName: "Roanna Patton",
      accountMasked: "**** **** 9048",
    },
  ]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [selectedBankAccountId, setSelectedBankAccountId] = useState("bank-1");

  const queryTab = new URLSearchParams(location.search).get("tab");
  const activeView = dashboardItems.some((item) => item.id === queryTab)
    ? queryTab
    : "dashboard";

  const sellerProducts = useMemo(() => {
    const name = String(seller?.name || "")
      .trim()
      .toLowerCase();
    const allProducts = Array.isArray(productData) ? productData : [];

    if (!name) return allProducts.slice(0, 2);

    const own = allProducts.filter((item) => {
      const shopName = String(item?.shop?.name || "")
        .trim()
        .toLowerCase();
      return shopName === name || shopName.includes(name) || name.includes(shopName);
    });

    return own.length ? own : allProducts.slice(0, 2);
  }, [seller?.name]);

  const sellerEvents = useMemo(() => {
    return sellerProducts.map((product, index) => ({
      id: `EV-${120 + index}`,
      productId: `69abd${index}088124dd5a...`,
      name: product?.name || "Event Product",
      price: product?.discount_price ?? product?.price ?? 0,
      stock: product?.stock ?? 0,
      soldOut: product?.total_sell ?? 0,
      startDate: makeEventDate(1 + index * 2),
      endDate: makeEventDate(7 + index * 3),
    }));
  }, [sellerProducts]);

  const sellerCoupons = useMemo(
    () => [
      {
        id: "69abd9a988124d...",
        name: "first coupon code",
        value: 10,
        minAmount: 100,
        maxAmount: 500,
        product: sellerProducts?.[0]?.name || "Gaming Headphone",
        category: sellerProducts?.[0]?.category || "Computers and Laptops",
      },
    ],
    [sellerProducts],
  );

  const orders = [
    {
      id: "69d41243b948a...",
      customer: "Masab Ashraf",
      items: "Enim assumenda ullam + ...",
      total: 236,
      status: "processing",
      qty: 5,
      date: "Apr 7, 2026",
    },
    {
      id: "69abd90388124d...",
      customer: "Masab Ashraf",
      items: "Enim assumenda ullam, ...",
      total: 178,
      status: "shipping",
      qty: 3,
      date: "Mar 7, 2026",
    },
  ];

  const availableBalance = 10;
  const pendingOrders = orders.filter((item) => item.status !== "delivered").length;
  const averageOrderValue =
    orders.length > 0
      ? orders.reduce((sum, item) => sum + Number(item.total || 0), 0) / orders.length
      : 0;
  const withdrawAmount = Number(withdrawInput || 0);
  const fee = withdrawAmount * 0.1;
  const userReceives = Math.max(withdrawAmount - fee, 0);

  const canSubmitWithdraw =
    !!selectedBankAccountId &&
    withdrawAmount > 0 &&
    withdrawAmount <= availableBalance;

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

  const handleAddBankAccount = (payload) => {
    const accountNumber = String(payload?.accountNumber || "").replace(/\s+/g, "");
    const pin = String(payload?.pin || "").trim();

    if (!/^\d{8,30}$/.test(accountNumber)) {
      window.alert("Account number must be between 8 and 30 digits.");
      return;
    }

    if (!/^\d{4}$/.test(pin)) {
      window.alert("PIN must be exactly 4 digits.");
      return;
    }

    const nextAccount = {
      id: `bank-${Date.now()}`,
      bankName: payload.bankName,
      accountHolderName: payload.accountHolderName,
      accountMasked: `**** **** ${accountNumber.slice(-4)}`,
    };

    setBankAccounts((prev) => [...prev, nextAccount]);
    setSelectedBankAccountId(nextAccount.id);
    setShowBankModal(false);
  };

  const handleDeleteBankAccount = (accountId) => {
    const nextAccounts = bankAccounts.filter((item) => item.id !== accountId);
    setBankAccounts(nextAccounts);

    if (selectedBankAccountId === accountId) {
      setSelectedBankAccountId(nextAccounts[0]?.id || "");
    }
  };

  const handleSubmitWithdrawRequest = () => {
    if (!canSubmitWithdraw) return;

    const selectedAccount = bankAccounts.find(
      (account) => account.id === selectedBankAccountId,
    );

    if (!selectedAccount) return;

    setWithdrawals((prev) => [
      {
        id: `w-${Date.now()}`,
        amount: Number(withdrawAmount.toFixed(2)),
        fee: Number(fee.toFixed(2)),
        netAmount: Number(userReceives.toFixed(2)),
        bankName: selectedAccount.bankName,
        accountHolderName: selectedAccount.accountHolderName,
        accountLast4: selectedAccount.accountMasked.slice(-4),
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    setWithdrawInput("");
  };

  const handleTabChange = (tabId) => {
    navigate(
      tabId === "dashboard" ? "/shop-dashboard" : `/shop-dashboard/?tab=${tabId}`,
      {
        replace: true,
      },
    );
  };

  return (
    <section className="min-h-screen w-full bg-linear-to-b from-slate-100 via-slate-50 to-white text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img
              src={"../../public/mocco-favicon.png"}
              alt="Shop"
              className="h-9 w-9 object-cover"
            />
            <div>
              <p className="text-xl font-bold leading-none text-slate-800">Mocco Mart</p>
              <p className="text-xs text-slate-500">Seller Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <TopRightIcon icon={Tag} colorClass="text-orange-500" />
            <TopRightIcon icon={Gift} colorClass="text-pink-500" />
            <TopRightIcon icon={ShoppingBag} colorClass="text-blue-500" />
            <TopRightIcon icon={Package} colorClass="text-emerald-500" />
            <TopRightIcon icon={Inbox} colorClass="text-violet-500" />

            <img
              src={"https://dummyimage.com/120x120/e2e8f0/64748b.png&text=Seller"}
              alt="Seller profile"
              className="ml-2 h-10 w-10 rounded-full border border-slate-200 object-cover shadow-sm"
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr]">
        <aside className="z-20 h-fit border-b border-slate-200 bg-white lg:sticky lg:top-20 xl:h-[calc(100vh-73px)] xl:overflow-y-auto xl:border-b-0 xl:border-r">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Shop Dashboard</h2>
            <p className="text-sm text-slate-500">Manage your store</p>
          </div>

          <nav className="space-y-2 p-4">
            {dashboardItems.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                active={activeView === item.id}
                onClick={handleTabChange}
              />
            ))}

            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:text-base"
            >
              <LogOut size={18} />
              Log Out
            </button>
          </nav>
        </aside>

        <main className="p-4 sm:p-6 lg:p-8 xl:p-10">
          <ShopDashboardContent
            activeView={activeView}
            seller={seller}
            sellerProducts={sellerProducts}
            sellerEvents={sellerEvents}
            sellerCoupons={sellerCoupons}
            orders={orders}
            withdrawals={withdrawals}
            availableBalance={availableBalance}
            pendingOrders={pendingOrders}
            averageOrderValue={averageOrderValue}
            bankAccounts={bankAccounts}
            selectedBankAccountId={selectedBankAccountId}
            withdrawInput={withdrawInput}
            withdrawAmount={withdrawAmount}
            fee={fee}
            userReceives={userReceives}
            canSubmitWithdraw={canSubmitWithdraw}
            showBankModal={showBankModal}
            formatMoney={formatMoney}
            pakistanBanks={pakistanBanks}
            onOpenBankModal={() => setShowBankModal(true)}
            onCloseBankModal={() => setShowBankModal(false)}
            onSelectBankAccount={setSelectedBankAccountId}
            onChangeWithdrawInput={setWithdrawInput}
            onDeleteBankAccount={handleDeleteBankAccount}
            onSubmitWithdrawRequest={handleSubmitWithdrawRequest}
            onAddBankAccount={handleAddBankAccount}
          />
        </main>
      </div>
    </section>
  );
};

export default ShopDashboard;
