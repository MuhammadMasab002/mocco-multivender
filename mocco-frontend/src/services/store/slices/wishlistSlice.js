import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  ids: [],
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    wishlistRequest(state) {
      state.isLoading = true;
    },
    wishlistSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
      state.ids = action.payload.map((item) => {
        return item.productId?._id || item.productId || item._id || item.id;
      });
      state.error = null;
    },
    wishlistFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // For guest users (local storage)
    addGuestWishlistItem(state, action) {
      const productId = action.payload;
      if (!state.ids.includes(productId)) {
        state.ids.push(productId);
      }
    },
    removeGuestWishlistItem(state, action) {
      const productId = action.payload;
      state.ids = state.ids.filter((id) => id !== productId);
    },
    clearWishlistState(state) {
      state.items = [];
      state.ids = [];
      state.isLoading = false;
      state.error = null;
    },
    clearWishlistErrors(state) {
      state.error = null;
    }
  },
});

export const {
  wishlistRequest,
  wishlistSuccess,
  wishlistFail,
  addGuestWishlistItem,
  removeGuestWishlistItem,
  clearWishlistState,
  clearWishlistErrors
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

