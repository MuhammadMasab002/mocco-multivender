import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    cartSuccess(state, action) {
      state.isLoading = false;
      state.cartItems = action.payload; // array of { productId: {...}, quantity }
      state.error = null;
    },
    cartFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // --- Guest Cart Helpers (local state) ---
    addGuestCartItem(state, action) {
      const { product, quantity } = action.payload;
      // Note: product is the full product object here because we need it for UI
      const existingItemIndex = state.cartItems.findIndex(
        (i) => i.productId._id === product._id
      );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += quantity;
      } else {
        state.cartItems.push({ productId: product, quantity });
      }
    },
    updateGuestCartItemQty(state, action) {
      const { productId, quantity } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (i) => i.productId._id === productId
      );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity = quantity;
      }
    },
    removeGuestCartItem(state, action) {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId._id !== productId
      );
    },
    clearCartState(state) {
      state.cartItems = [];
      state.isLoading = false;
      state.error = null;
    },
    clearCartErrors(state) {
      state.error = null;
    },
  },
});

export const {
  cartRequest,
  cartSuccess,
  cartFail,
  addGuestCartItem,
  updateGuestCartItemQty,
  removeGuestCartItem,
  clearCartState,
  clearCartErrors,
} = cartSlice.actions;

export default cartSlice.reducer;
