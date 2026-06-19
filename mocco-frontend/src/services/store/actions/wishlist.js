import axios from "axios";
import {
    wishlistRequest,
    wishlistSuccess,
    wishlistFail,
    addGuestWishlistItem,
    removeGuestWishlistItem,
    clearWishlistState,
} from "../slices/wishlistSlice";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const GUEST_WISHLIST_KEY = "guest_wishlist";

// --- API ACTIONS (Authenticated) ---

export const getWishlist = () => async (dispatch) => {
    try {
        dispatch(wishlistRequest());
        const { data } = await axios.get(`${backendUrl}/wishlist`, {
            withCredentials: true,
        });
        dispatch(wishlistSuccess(data.wishlist));
        return data;
    } catch (error) {
        const message = error?.response?.data?.message || "Failed to load wishlist";
        dispatch(wishlistFail(message));
        throw error;
    }
};

export const addToWishlist = (productId) => async (dispatch) => {
    const { data } = await axios.post(`${backendUrl}/wishlist`, { productId }, {
        withCredentials: true,
    });
    // Refetch to sync state correctly
    dispatch(getWishlist());
    return data;
};

export const removeFromWishlist = (productId) => async (dispatch) => {
    const { data } = await axios.delete(`${backendUrl}/wishlist/${productId}`, {
        withCredentials: true,
    });
    dispatch(getWishlist());
    return data;
};

export const clearWishlist = () => async (dispatch) => {
    const { data } = await axios.delete(`${backendUrl}/wishlist`, {
        withCredentials: true,
    });
    dispatch(wishlistSuccess([]));
    return data;
};

export const mergeWishlist = (productIds) => async (dispatch) => {
    const { data } = await axios.post(`${backendUrl}/wishlist/merge`, { productIds }, {
        withCredentials: true,
    });
    dispatch(getWishlist());
    return data;
};

// --- GUEST HELPERS (localStorage) ---

export const getGuestWishlist = () => {
    try {
        const data = localStorage.getItem(GUEST_WISHLIST_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
};

export const addToGuestWishlistAction = (productId) => (dispatch) => {
    const list = getGuestWishlist();
    if (!list.includes(productId)) {
        list.push(productId);
        localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(list));
        dispatch(addGuestWishlistItem(productId));
    }
};

export const removeFromGuestWishlistAction = (productId) => (dispatch) => {
    const list = getGuestWishlist();
    const updated = list.filter((id) => id !== productId);
    localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(updated));
    dispatch(removeGuestWishlistItem(productId));
};

export const clearGuestWishlistAction = () => (dispatch) => {
    localStorage.removeItem(GUEST_WISHLIST_KEY);
    dispatch(clearWishlistState());
};

// Initialize Guest Wishlist on App Load (or when logging out)
export const initGuestWishlist = () => (dispatch) => {
    const list = getGuestWishlist();
    list.forEach(id => dispatch(addGuestWishlistItem(id)));
};
