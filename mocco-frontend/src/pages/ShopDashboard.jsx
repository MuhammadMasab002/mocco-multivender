import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ShopDashboardHeader from "../components/shopDashboard/ShopDashboardHeader";
import ShopDashboardSidebar from "../components/shopDashboard/ShopDashboardSidebar";
import ShopDashboardContent from "../components/shopDashboard/ShopDashboardContent";
import { dashboardItems } from "../components/shopDashboard/constants/dashboardItems";
import { loadSeller } from "../services/store/actions/seller";
import { getProducts } from "../services/store/actions/product";
import { getEvents } from "../services/store/actions/event";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const formatMoney = (amount = 0) => `$${Number(amount || 0).toFixed(2)}`;

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

const ShopDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.event);

  // Fetch products and events for the seller on mount
  useEffect(() => {
    if (seller?._id) {
      dispatch(getProducts(seller._id));
      dispatch(getEvents(seller._id));
    }
  }, [seller?._id, dispatch]);

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

  const sellerEvents = useMemo(() => {
    return Array.isArray(events) ? events : [];
  }, [events]);

  const sellerCoupons = useMemo(
    () => [
      {
        id: "69abd9a988124d...",
        name: "first coupon code",
        value: 10,
        minAmount: 100,
        maxAmount: 500,
        product: products?.[0]?.name || "Product",
        category: products?.[0]?.category || "Category",
      },
    ],
    [products],
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
  const pendingOrders = orders.filter(
    (item) => item.status !== "delivered",
  ).length;
  const averageOrderValue =
    orders.length > 0
      ? orders.reduce((sum, item) => sum + Number(item.total || 0), 0) /
        orders.length
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
    const accountNumber = String(payload?.accountNumber || "").replace(
      /\s+/g,
      "",
    );
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
      tabId === "dashboard"
        ? "/shop-dashboard"
        : `/shop-dashboard/?tab=${tabId}`,
      {
        replace: true,
      },
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
          <ShopDashboardContent
            activeView={activeView}
            seller={seller}
            sellerProducts={products}
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
