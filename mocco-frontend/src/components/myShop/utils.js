export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const toTitle = (value = "") =>
    String(value).trim().replace(/\s+/g, " ") || "Untitled";

export const normalize = (value = "") => String(value).trim().toLowerCase();

export const formatJoinedDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export const resolveImageUrl = (value) => {
    if (!value)
        return "https://dummyimage.com/240x240/e2e8f0/64748b.png&text=Shop";

    if (String(value).startsWith("http")) return value;
    if (String(value).startsWith("/")) return `${backendUrl}${value}`;

    return `${backendUrl}/${value}`;
};

export const initialFormState = (shop) => ({
    name: shop?.name || "",
    email: shop?.email || "",
    addresses: shop?.addresses || "",
    phoneNumber: shop?.phoneNumber || "",
    zipCode: String(shop?.zipCode || ""),
    description: shop?.description || "",
    avatarUrl: resolveImageUrl(shop?.avatar?.url),
});
