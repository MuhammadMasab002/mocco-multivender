import axios from "axios";
import {
  cartRequest,
  cartSuccess,
  cartFail,
  addGuestCartItem,
  updateGuestCartItemQty,
  removeGuestCartItem,
  clearCartState,
} from "../slices/cartSlice";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const GUEST_CART_KEY = "guest_cart";

// --- API ACTIONS (Authenticated) ---

const getCart = () => async (dispatch) => {
  try {
    dispatch(cartRequest());
    const { data } = await axios.get(`${backendUrl}/cart`, {
      withCredentials: true,
    });
    dispatch(cartSuccess(data.cart.items || []));
    return data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to load cart";
    dispatch(cartFail(message));
  }
};

const addToCart = (productId, quantity = 1) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/cart`,
      { productId, quantity },
      { withCredentials: true }
    );
    dispatch(getCart());
    return data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to add to cart";
    toast.error(message);
    throw error;
  }
};

const updateCartItemQty = (productId, quantity) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `${backendUrl}/cart/item/${productId}`,
      { quantity },
      { withCredentials: true }
    );
    dispatch(getCart());
    return data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to update quantity";
    toast.error(message);
    throw error;
  }
};

const removeFromCart = (productId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${backendUrl}/cart/item/${productId}`,
      { withCredentials: true }
    );
    dispatch(getCart());
    return data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to remove item";
    toast.error(message);
    throw error;
  }
};

const clearCart = () => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${backendUrl}/cart/clear`, {
      withCredentials: true,
    });
    dispatch(cartSuccess([]));
    return data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to clear cart";
    toast.error(message);
    throw error;
  }
};

const mergeCart = (items) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/cart/merge`,
      { items },
      { withCredentials: true }
    );
    dispatch(getCart());
    return data;
  } catch (error) {
    console.error("Merge error:", error);
    throw error;
  }
};

// --- GUEST HELPERS (localStorage) ---

const getGuestCart = () => {
  try {
    const data = localStorage.getItem(GUEST_CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

// product object is passed here so the UI has all data (price, image, name)
const addToGuestCartAction = (product, quantity = 1) => (dispatch) => {
  const list = getGuestCart();
  const existingIndex = list.findIndex(i => i.productId._id === product._id);

  if (existingIndex !== -1) {
    let newQty = list[existingIndex].quantity + quantity;
    if (newQty > product.stock) {
      toast.error(`Only ${product.stock} items left in stock`);
      return;
    }
    list[existingIndex].quantity = newQty;
  } else {
    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items left in stock`);
      return;
    }
    list.push({ productId: product, quantity });
  }

  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(list));
  dispatch(addGuestCartItem({ product, quantity }));
  toast.success("Added to local cart");
};

const updateGuestCartQtyAction = (productId, quantity, stock) => (dispatch) => {
  if (quantity > stock) {
    toast.error(`Only ${stock} items left in stock`);
    return;
  }
  if (quantity < 1) return;

  const list = getGuestCart();
  const existingIndex = list.findIndex(i => i.productId._id === productId);

  if (existingIndex !== -1) {
    list[existingIndex].quantity = quantity;
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(list));
    dispatch(updateGuestCartItemQty({ productId, quantity }));
  }
};

const removeFromGuestCartAction = (productId) => (dispatch) => {
  const list = getGuestCart();
  const updated = list.filter((i) => i.productId._id !== productId);
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(updated));
  dispatch(removeGuestCartItem(productId));
  toast.success("Removed from local cart");
};

const clearGuestCartAction = () => (dispatch) => {
  localStorage.removeItem(GUEST_CART_KEY);
  dispatch(clearCartState());
};

// Initialize Guest Cart on App Load
const initGuestCart = () => (dispatch) => {
  const list = getGuestCart();
  dispatch(cartSuccess(list)); // Populates state.cartItems
};

export {
  getCart,
  addToCart,
  updateCartItemQty,
  removeFromCart,
  clearCart,
  mergeCart,
  getGuestCart,
  addToGuestCartAction,
  updateGuestCartQtyAction,
  removeFromGuestCartAction,
  clearGuestCartAction,
  initGuestCart,
};