import { LogOut } from "lucide-react";

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

const dotTokens = {
  blue: "bg-blue-600",
  emerald: "bg-emerald-600",
  violet: "bg-violet-600",
  orange: "bg-orange-600",
  sky: "bg-sky-600",
  pink: "bg-pink-600",
  indigo: "bg-indigo-600",
  teal: "bg-teal-600",
  amber: "bg-amber-600",
  slate: "bg-slate-600",
};

const SidebarItem = ({ item, active, onClick }) => {
  const IconComponent = item.icon;
  const activeColor = colorTokens[item.color] || colorTokens.slate;

  return (
    <button
      type="button"
      onClick={() => onClick(item.id)}
      className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-base font-semibold transition-all duration-300 group ${
        active
          ? `${activeColor} shadow-[0_8px_20px_rgba(15,23,42,0.08)]`
          : "border-transparent text-slate-600 hover:bg-slate-50"
      }`}
    >
      <span className="flex items-center gap-3 text-sm font-medium sm:text-[15px]">
        <IconComponent
          size={22}
          className={`transition-transform ${active ? "group-hover:rotate-12" : ""}`}
        />

        <span>{item.label}</span>
      </span>

      {active && (
        <span
          className={`flex h-2.5 w-2.5 justify-self-end rounded-full transition-all ${dotTokens[item.color] || dotTokens.slate}`}
        />
      )}
    </button>
  );
};

const ShopDashboardSidebar = ({ items, activeView, onTabChange, onLogout }) => {
  return (
    <aside className="z-20 h-fit pb-10 border-b border-slate-200 bg-white lg:sticky lg:top-20 xl:border-r xl:border-b-0">
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          Shop Dashboard
        </h2>
        <p className="text-sm text-slate-500">Manage your store</p>
      </div>

      <nav className="space-y-2 p-4">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            active={activeView === item.id}
            onClick={onTabChange}
          />
        ))}

        <button
          type="button"
          onClick={onLogout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl cursor-pointer bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:text-base"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </nav>
    </aside>
  );
};

export default ShopDashboardSidebar;
