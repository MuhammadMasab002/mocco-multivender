import {
  BadgePercent,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  HandCoins,
  Package,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import DashboardStatCard from "../shared/DashboardStatCard";

const DashboardTab = ({
  seller,
  sellerProducts,
  sellerEvents,
  orders,
  withdrawals,
  pendingOrders,
  averageOrderValue,
  formatMoney,
}) => (
  <div className="space-y-6">
    <div className="rounded-2xl p-6 text-center sm:p-8">
      <p className="text-[11px] uppercase tracking-[0.24em] text-red-500">
        Dashboard Overview
      </p>
      <h1 className="mt-3 text-2xl font-normal tracking-tight text-slate-900 sm:text-3xl">
        Welcome back, {seller?.name || "Seller"}
      </h1>
      <div className="mx-auto mt-8 h-0.5 w-20 rounded-full bg-slate-400" />
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
      <p className="text-lg font-medium text-slate-700 sm:text-xl">
        Available Balance
      </p>
      <div className="mx-auto mt-2 h-0.5 w-14 rounded-full bg-slate-400" />
      <p className="mt-5 text-3xl font-semibold text-slate-900 sm:text-4xl">
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
      <CircleDollarSign className="mx-auto mt-12 text-slate-300" size={40} />
      <p className="mt-6 text-lg font-normal text-slate-700 sm:text-xl">
        No transactions yet
      </p>
      <p className="mx-auto mt-2 max-w-2xl leading-7 text-slate-500">
        Your withdrawal history will appear here once you make your first
        withdrawal
      </p>
    </div>
  </div>
);

export default DashboardTab;
