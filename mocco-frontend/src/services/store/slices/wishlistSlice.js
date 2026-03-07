import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ids: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action) {
      state.ids = action.payload;
    },
    toggleWishlist(state, action) {
      const productId = action.payload;
      const index = state.ids.indexOf(productId);

      if (index === -1) {
        state.ids.push(productId);
      } else {
        state.ids.splice(index, 1);
      }
    },
    clearWishlist(state) {
      state.ids = [];
    },
  },
});

export const { setWishlist, toggleWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
