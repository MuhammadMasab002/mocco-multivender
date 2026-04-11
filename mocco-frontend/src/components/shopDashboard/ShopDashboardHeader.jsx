import { Gift, Inbox, Package, ShoppingBag, Tag } from "lucide-react";

const TopRightIcon = ({
  title,
  icon,
  colorClass = "text-slate-500",
  onClick,
  active = false,
}) => {
  const IconComponent = icon;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={title}
      title={title}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg cursor-pointer border transition ${
        active
          ? "border-slate-200 bg-slate-50"
          : "border-transparent hover:border-slate-200 hover:bg-slate-50"
      }`}
    >
      <IconComponent size={20} className={colorClass} />
    </button>
  );
};

const topIcons = [
  {
    title: "Products",
    icon: Package,
    colorClass: "text-emerald-500",
    tabId: "all-products",
  },
  {
    title: "Events",
    icon: Tag,
    colorClass: "text-orange-500",
    tabId: "all-events",
  },
  {
    title: "Coupons",
    icon: Gift,
    colorClass: "text-pink-500",
    tabId: "all-coupons",
  },
  {
    title: "Orders",
    icon: ShoppingBag,
    colorClass: "text-blue-500",
    tabId: "orders",
  },
  {
    title: "Messages",
    icon: Inbox,
    colorClass: "text-violet-500",
    tabId: "inbox",
  },
];

const ShopDashboardHeader = ({ activeView, onTabChange }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <img
            src={"../../public/mocco-favicon.png"}
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
          {topIcons.map((item) => (
            <TopRightIcon
              key={item.tabId}
              title={item.title}
              icon={item.icon}
              colorClass={item.colorClass}
              onClick={() => onTabChange(item.tabId)}
              active={activeView === item.tabId}
            />
          ))}

          <img
            src={"https://dummyimage.com/120x120/e2e8f0/64748b.png&text=Seller"}
            alt="Seller profile"
            className="ml-2 h-10 w-10 rounded-full border border-slate-200 object-cover shadow-sm"
          />
        </div>
      </div>
    </header>
  );
};

export default ShopDashboardHeader;
