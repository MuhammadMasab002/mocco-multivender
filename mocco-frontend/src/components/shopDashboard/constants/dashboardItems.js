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
    Undo2,
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
    { id: "all-coupons", label: "All Coupons", icon: Gift, color: "pink" },
    { id: "create-coupon", label: "Create Coupon", icon: Ticket, color: "indigo" },
    { id: "all-orders", label: "All Orders", icon: ShoppingBag, color: "blue" },
    { id: "refunds", label: "Refunds", icon: Undo2, color: "violet" },
    { id: "withdraw", label: "Withdraw Money", icon: Wallet, color: "amber" },
    { id: "inbox", label: "Shop Inbox", icon: Inbox, color: "slate" },
];
