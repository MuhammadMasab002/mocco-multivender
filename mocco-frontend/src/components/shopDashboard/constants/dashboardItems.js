import {
    CalendarDays,
    Gift,
    Inbox,
    LayoutDashboard,
    Package,
    Plus,
    ShoppingBag,
    Tag,
    Ticket,
    Wallet,
} from "lucide-react";

export const dashboardItems = [
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
