import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSellerAuthenticated: false,
    isLoading: true,
    updateLoading: false,
    seller: null,
    error: null,
    success: false,
};

const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
        // These replace your LoadSellerRequest, LoadSellerSuccess, etc.
        loadSellerRequest: (state) => {
            state.isLoading = true;
        },
        loadSellerSuccess: (state, action) => {
            state.isLoading = false;
            state.isSellerAuthenticated = Boolean(action.payload);
            state.seller = action.payload;
            state.error = null;
        },
        loadSellerFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isSellerAuthenticated = false;
        },
        // Update seller info
        updateSellerRequest: (state) => {
            state.updateLoading = true;
            state.error = null;
            state.success = false;
        },
        updateSellerSuccess: (state, action) => {
            state.updateLoading = false;
            state.seller = action.payload;
            state.error = null;
            state.success = true;
        },
        updateSellerFail: (state, action) => {
            state.updateLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        // Clear error utility
        clearErrors: (state) => {
            state.error = null;
            state.success = false;
        }
    },
});

export const {
    loadSellerRequest,
    loadSellerSuccess,
    loadSellerFail,
    updateSellerRequest,
    updateSellerSuccess,
    updateSellerFail,
    clearErrors
} = sellerSlice.actions;

export default sellerSlice.reducer;