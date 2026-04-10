import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BadgePercent,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  Gift,
  HandCoins,
  Inbox,
  LayoutDashboard,
  LogOut,
  Eye,
  EyeOff,
  Package,
  Plus,
  ShoppingBag,
  Tag,
  Ticket,
  Trash2,
  Wallet,
  X,
} from "lucide-react";
import axios from "axios";
import { productData } from "../static/data";
import { loadSeller } from "../services/store/actions/seller";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const formatMoney = (amount = 0) => `$${Number(amount || 0).toFixed(2)}`;

const dashboardItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: "blue" },
  {
    id: "all-products",
    label: "All Products",
    icon: Package,
    color: "emerald",
  },
  {
    id: "create-product",
    label: "Create Product",
    icon: Plus,
    color: "violet",
  },
  { id: "all-events", label: "All Events", icon: Tag, color: "orange" },
  {
    id: "create-event",
    label: "Create Event",
    icon: CalendarDays,
    color: "sky",
  },
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

const makeEventDate = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toLocaleDateString("en-GB");
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

const ProductOrEventForm = ({ mode = "product", onSubmit }) => {
  const isEvent = mode === "event";

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_34px_rgba(15,23,42,0.06)] sm:p-8"
    >
      <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {isEvent ? "Create New Event" : "Create New Product"}
      </h2>

      <div className="mt-8 space-y-6">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">
            Product Name <span className="text-rose-500">*</span>
          </span>
          <input
            type="text"
            placeholder="Product Name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">
            Description <span className="text-rose-500">*</span>
          </span>
          <textarea
            rows={5}
            placeholder="Product Description"
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            required
          />
        </label>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Category <span className="text-rose-500">*</span>
            </span>
            <select
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Choose a category
              </option>
              <option>Computers and Laptops</option>
              <option>Mobile and Tablets</option>
              <option>Music and Gaming</option>
              <option>Others</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Tags</span>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </label>
        </div>

        {isEvent && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Event Start Date <span className="text-rose-500">*</span>
              </span>
              <input
                type="date"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                required
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Event End Date <span className="text-rose-500">*</span>
              </span>
              <input
                type="date"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                required
              />
            </label>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Original Price
            </span>
            <input
              type="number"
              placeholder="Original Price"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Discount Price <span className="text-rose-500">*</span>
            </span>
            <input
              type="number"
              placeholder="Discount Price"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              required
            />
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">
            Product Stock <span className="text-rose-500">*</span>
          </span>
          <input
            type="number"
            placeholder="0"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            required
          />
        </label>

        <div>
          <p className="text-sm font-semibold text-slate-700">
            Product Images <span className="text-rose-500">*</span>
          </p>
          <div className="mt-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <button
                type="button"
                className="inline-flex h-28 w-28 items-center justify-center rounded-xl border-2 border-blue-400 bg-blue-50 text-3xl font-semibold text-blue-600"
              >
                +
              </button>
              <p className="text-center text-slate-500 sm:pt-10 sm:text-left">
                Click the + button to add product images
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
        >
          {isEvent ? "Create Event" : "Create Product"}
        </button>
      </div>
    </form>
  );
};

const CouponForm = ({ onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_34px_rgba(15,23,42,0.06)] sm:p-8"
    >
      <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        Create Coupon
      </h2>

      <div className="mt-8 space-y-6">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">
            Coupon Code <span className="text-rose-500">*</span>
          </span>
          <input
            type="text"
            placeholder="e.g. OFF20"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            required
          />
        </label>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Value (%) <span className="text-rose-500">*</span>
            </span>
            <input
              type="number"
              defaultValue={10}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Min Amount
            </span>
            <input
              type="number"
              defaultValue={100}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Max Amount
            </span>
            <input
              type="number"
              defaultValue={500}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Select Product <span className="text-rose-500">*</span>
            </span>
            <select
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select Product
              </option>
              <option>Gaming pad (mouse pad) Dolore qui</option>
              <option>Enim assumenda ullam</option>
            </select>
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">
            Select Category
          </span>
          <select
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            defaultValue=""
          >
            <option value="" disabled>
              Select Category
            </option>
            <option>Computers and Laptops</option>
            <option>Mobile and Tablets</option>
            <option>Music and Gaming</option>
            <option>Others</option>
          </select>
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
        >
          Create Coupon
        </button>
      </div>
    </form>
  );
};

const TableActionIcon = ({ type = "preview" }) => {
  const isDelete = type === "delete";
  const IconComponent = isDelete ? Trash2 : Eye;

  return (
    <button
      type="button"
      aria-label={isDelete ? "Delete" : "Preview"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition ${
        isDelete
          ? "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
          : "border-sky-200 bg-sky-50 text-sky-600 hover:bg-sky-100"
      }`}
    >
      <IconComponent size={16} />
    </button>
  );
};

const TruncateTextCell = ({
  text,
  maxWidthClass = "max-w-44",
  mono = false,
}) => {
  const value = String(text ?? "-");

  return (
    <span
      title={value}
      className={`block truncate ${maxWidthClass} ${mono ? "font-mono text-xs sm:text-sm" : ""}`}
    >
      {value}
    </span>
  );
};

const TableShell = ({ columns, rows }) => (
  <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="border-b border-slate-200 bg-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="border-r border-slate-200 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-slate-600 last:border-r-0"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-slate-200">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

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

const AddBankAccountModal = ({ open, loading, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    pin: "",
  });
  const [showPin, setShowPin] = useState(false);

  if (!open) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Add Bank Account
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Select Bank *
            </span>
            <select
              value={formData.bankName}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  bankName: event.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              required
            >
              <option value="" disabled>
                Choose your bank
              </option>
              {pakistanBanks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Account Holder Name *
            </span>
            <input
              type="text"
              value={formData.accountHolderName}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  accountHolderName: event.target.value,
                }))
              }
              placeholder="Enter account holder name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Account Number *
            </span>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  accountNumber: event.target.value,
                }))
              }
              placeholder="Enter account number"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              4-Digit PIN *
            </span>
            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                value={formData.pin}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, pin: event.target.value }))
                }
                placeholder="Enter 4-digit PIN"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-11 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                maxLength={4}
                required
              />
              <button
                type="button"
                onClick={() => setShowPin((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:bg-slate-100"
                aria-label="Toggle pin visibility"
              >
                {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </label>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? "Saving..." : "Add Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

const DashboardStatCard = ({
  title,
  value,
  subtitle,
  icon,
  iconWrapClass,
  iconClass,
  valueClass = "text-2xl",
}) => {
  const IconComponent = icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_22px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <span
          className={`inline-flex h-15 w-15 items-center justify-center rounded-xl ${iconWrapClass}`}
        >
          <IconComponent size={21} className={iconClass} />
        </span>
      </div>

      <p className={`mt-2 font-semibold text-slate-900 ${valueClass}`}>
        {value}
      </p>
      {subtitle ? (
        <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
};

const ShopDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);

  const [activeView, setActiveView] = useState("dashboard");
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
      return (
        shopName === name || shopName.includes(name) || name.includes(shopName)
      );
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

  const renderContent = () => {
    if (activeView === "dashboard") {
      return (
        <div className="space-y-6">
          <div className="rounded-2xl p-6 text-center sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.24em] text-red-500">
              Dashboard Overview
            </p>
            <h1 className="mt-3 text-2xl sm:text-3xl font-normal tracking-tight text-slate-900">
              Welcome back, {seller?.name || "Seller"}
            </h1>
            <div className="mx-auto mt-8 h-0.5 w-20 rounded-full bg-slate-400" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
            <p className="text-lg sm:text-xl font-medium text-slate-700">
              Available Balance
            </p>
            <div className="mx-auto mt-2 h-0.5 w-14 rounded-full bg-slate-400" />
            <p className="mt-5 text-3xl sm:text-4xl font-semibold text-slate-900">
              $0.00
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <DashboardStatCard
              title="Total Products"
              value={sellerProducts.length}
              icon={Package}
              iconWrapClass="bg-blue-50"
              iconClass="text-blue-600"
            />
            <DashboardStatCard
              title="Total Orders"
              value={orders.length}
              subtitle="0 delivered"
              icon={ShoppingBag}
              iconWrapClass="bg-emerald-50"
              iconClass="text-emerald-600"
            />
            <DashboardStatCard
              title="Total Revenue"
              value={formatMoney(0)}
              subtitle="After 10% platform fees"
              icon={Wallet}
              iconWrapClass="bg-violet-50"
              iconClass="text-violet-600"
            />
            <DashboardStatCard
              title="Active Events"
              value={sellerEvents.length}
              icon={CalendarDays}
              iconWrapClass="bg-orange-50"
              iconClass="text-orange-600"
            />
            <DashboardStatCard
              title="Pending Orders"
              value={pendingOrders}
              icon={Clock3}
              iconWrapClass="bg-blue-50"
              iconClass="text-blue-600"
            />
            <DashboardStatCard
              title="Average Order Value"
              value={formatMoney(averageOrderValue)}
              icon={HandCoins}
              iconWrapClass="bg-emerald-50"
              iconClass="text-emerald-600"
            />
            <DashboardStatCard
              title="Withdrawal Requests"
              value={withdrawals.length}
              icon={BadgePercent}
              iconWrapClass="bg-violet-50"
              iconClass="text-violet-600"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
            <h2 className="text-xl font-medium tracking-tight text-slate-900">
              Recent Transactions
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-slate-400" />
            <CircleDollarSign
              className="mx-auto mt-12 text-slate-300"
              size={40}
            />
            <p className="mt-6 text-lg sm:text-xl font-normal text-slate-700">
              No transactions yet
            </p>
            <p className="mx-auto mt-2 max-w-2xl leading-7 text-slate-500">
              Your withdrawal history will appear here once you make your first
              withdrawal
            </p>
          </div>
        </div>
      );
    }

    if (activeView === "all-products") {
      return (
        <TableShell
          columns={[
            "Product Id",
            "Name",
            "Price",
            "Stock",
            "Sold Out",
            "Preview",
            "Delete",
          ]}
          rows={sellerProducts.map((item, i) => [
            <TruncateTextCell
              text={`69abd7d0${i}88124dd5a`}
              maxWidthClass="max-w-36"
              mono
            />,
            <TruncateTextCell
              text={item?.name || "Unnamed Product"}
              maxWidthClass="max-w-48"
            />,
            `US$ ${item?.discount_price ?? item?.price ?? 0}`,
            item?.stock ?? 0,
            item?.total_sell ?? 0,
            <TableActionIcon type="preview" />,
            <TableActionIcon type="delete" />,
          ])}
        />
      );
    }

    if (activeView === "create-product") {
      return (
        <ProductOrEventForm
          mode="product"
          onSubmit={(e) => e.preventDefault()}
        />
      );
    }

    if (activeView === "all-events") {
      return (
        <TableShell
          columns={[
            "Product Id",
            "Name",
            "Price",
            "Stock",
            "Sold Out",
            "Start",
            "End",
            "Delete",
          ]}
          rows={sellerEvents.map((item) => [
            <TruncateTextCell
              text={item.productId}
              maxWidthClass="max-w-36"
              mono
            />,
            <TruncateTextCell text={item.name} maxWidthClass="max-w-48" />,
            `US$ ${item.price}`,
            item.stock,
            item.soldOut,
            item.startDate,
            item.endDate,
            <TableActionIcon type="delete" />,
          ])}
        />
      );
    }

    if (activeView === "create-event") {
      return (
        <ProductOrEventForm mode="event" onSubmit={(e) => e.preventDefault()} />
      );
    }

    if (activeView === "all-coupons") {
      return (
        <TableShell
          columns={[
            "Coupon Id",
            "Name",
            "Value (%)",
            "Min Amount",
            "Max Amount",
            "Product",
            "Category",
            "Delete",
          ]}
          rows={sellerCoupons.map((item) => [
            <TruncateTextCell text={item.id} maxWidthClass="max-w-36" mono />,
            <TruncateTextCell text={item.name} maxWidthClass="max-w-40" />,
            `${item.value}%`,
            item.minAmount,
            item.maxAmount,
            <TruncateTextCell text={item.product} maxWidthClass="max-w-44" />,
            item.category,
            <TableActionIcon type="delete" />,
          ])}
        />
      );
    }

    if (activeView === "create-coupon") {
      return <CouponForm onSubmit={(e) => e.preventDefault()} />;
    }

    if (activeView === "orders") {
      return (
        <TableShell
          columns={[
            "Order ID",
            "Customer",
            "Items",
            "Total",
            "Status",
            "Quantity",
            "Order Date",
            "Preview",
            "Delete",
          ]}
          rows={orders.map((item) => [
            <TruncateTextCell text={item.id} maxWidthClass="max-w-36" mono />,
            <TruncateTextCell text={item.customer} maxWidthClass="max-w-40" />,
            <TruncateTextCell text={item.items} maxWidthClass="max-w-44" />,
            `US$ ${item.total.toFixed(2)}`,
            item.status,
            item.qty,
            item.date,
            <TableActionIcon type="preview" />,
            <TableActionIcon type="delete" />,
          ])}
        />
      );
    }

    if (activeView === "withdraw") {
      return (
        <div className="mx-auto w-full max-w-3xl space-y-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Withdraw Money
          </h2>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
            <p className="text-3xl font-semibold text-emerald-600 sm:text-4xl">
              {formatMoney(availableBalance)}
            </p>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Current withdrawable balance
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                Your Bank Accounts
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowBankModal(true);
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white cursor-pointer transition hover:bg-blue-700 sm:text-base"
              >
                + Add New Account
              </button>
            </div>

            {bankAccounts.length ? (
              <div className="space-y-3">
                {bankAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-4"
                  >
                    <div>
                      <p className="text-base font-semibold text-slate-800 sm:text-lg">
                        {account.bankName}
                      </p>
                      <p className="text-sm text-slate-600 sm:text-base">
                        {account.accountHolderName}
                      </p>
                      <p className="text-sm text-slate-500">
                        {account.accountMasked}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteBankAccount(account.id)}
                      className="rounded-lg border border-rose-200 bg-rose-50 p-2 text-rose-600 cursor-pointer transition hover:bg-rose-100"
                      aria-label="Delete bank account"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">
                <p className="text-slate-500">No bank accounts added</p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
            <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Withdrawal Request
            </h3>

            <label className="mt-4 block space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Select Bank Account
              </span>
              <select
                value={selectedBankAccountId}
                onChange={(event) =>
                  setSelectedBankAccountId(event.target.value)
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                disabled={!bankAccounts.length}
              >
                {!bankAccounts.length ? (
                  <option value="">No bank accounts available</option>
                ) : (
                  bankAccounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.bankName} ({account.accountMasked})
                    </option>
                  ))
                )}
              </select>
            </label>

            <label className="mt-5 block space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Withdrawal Amount ($)
              </span>
              <input
                type="number"
                value={withdrawInput}
                onChange={(e) => setWithdrawInput(e.target.value)}
                min="0"
                step="0.01"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none"
              />
            </label>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Maximum: {formatMoney(availableBalance)}
            </p>

            {withdrawAmount > 0 && (
              <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
                <p className="text-sm sm:text-base">
                  Amount: {formatMoney(withdrawAmount)}
                </p>
                <p className="text-sm sm:text-base">
                  Platform fee (10%): {formatMoney(fee)}
                </p>
                <p className="text-sm font-semibold sm:text-base">
                  You receive: {formatMoney(userReceives)}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmitWithdrawRequest}
              disabled={!canSubmitWithdraw}
              className="mt-4 w-full rounded-xl bg-slate-900 px-6 py-3 text-base font-semibold text-white cursor-pointer transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 sm:text-lg"
            >
              Submit Withdrawal Request
            </button>

            {withdrawAmount > availableBalance && (
              <p className="mt-2 text-sm font-medium text-rose-600">
                Withdrawal amount cannot be greater than your available balance.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
            <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Recent Withdrawals
            </h3>

            {!withdrawals.length ? (
              <p className="mt-3 text-slate-500">
                No withdrawal request submitted yet.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {[...withdrawals]
                  .sort(
                    (a, b) =>
                      new Date(b?.createdAt || 0).getTime() -
                      new Date(a?.createdAt || 0).getTime(),
                  )
                  .slice(0, 5)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-200 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-base font-semibold text-slate-800 sm:text-lg">
                          {formatMoney(item.amount)} to {item.bankName}
                        </p>
                        <p className="rounded-md bg-slate-100 px-2 py-1 text-sm font-semibold capitalize text-slate-700">
                          {item.status}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-slate-600 sm:text-base">
                        {item.accountHolderName} • **** **** {item.accountLast4}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Fee: {formatMoney(item.fee)} | You receive:{" "}
                        {formatMoney(item.netAmount)}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <AddBankAccountModal
            open={showBankModal}
            loading={false}
            onClose={() => setShowBankModal(false)}
            onSubmit={handleAddBankAccount}
          />
        </div>
      );
    }

    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
        <Inbox className="mx-auto text-slate-300" size={52} />
        <h3 className="mt-4 text-2xl font-semibold text-slate-800 sm:text-3xl">
          Shop Inbox
        </h3>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          No new messages yet
        </p>
      </div>
    );
  };

  return (
    <section className="min-h-screen w-full bg-linear-to-b from-slate-100 via-slate-50 to-white text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img
              src={"../../public/mocco-favicon.png"}
              // src={
              // seller?.avatar?.url ||
              // "https://dummyimage.com/120x120/e2e8f0/64748b.png&text=Shop"
              // }
              alt="Shop"
              className="h-9 w-9 object-cover"
            />
            <div>
              <p className="text-xl font-bold leading-none text-slate-800">
                Mocco Mart
              </p>
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
              src={
                // seller?.avatar?.url ||
                "https://dummyimage.com/120x120/e2e8f0/64748b.png&text=Seller"
              }
              alt="Seller profile"
              className="ml-2 h-10 w-10 rounded-full border border-slate-200 object-cover shadow-sm"
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr]">
        <aside className="z-20 h-fit border-b border-slate-200 bg-white lg:sticky lg:top-20 xl:h-[calc(100vh-73px)] xl:overflow-y-auto xl:border-b-0 xl:border-r">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Shop Dashboard
            </h2>
            <p className="text-sm text-slate-500">Manage your store</p>
          </div>

          <nav className="space-y-2 p-4">
            {dashboardItems.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                active={activeView === item.id}
                onClick={setActiveView}
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

        <main className="p-4 sm:p-6 lg:p-8 xl:p-10">{renderContent()}</main>
      </div>
    </section>
  );
};

export default ShopDashboard;
