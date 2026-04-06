import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSellerAuthenticated: false,
    isLoading: true,
    seller: null,
    error: null,
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
            state.isSellerAuthenticated = true;
            state.seller = action.payload;
        },
        loadSellerFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isSellerAuthenticated = false;
        },
        // Clear error utility
        clearErrors: (state) => {
            state.error = null;
        }
    },
});

export const {
    loadSellerRequest,
    loadSellerSuccess,
    loadSellerFail,
    clearErrors
} = sellerSlice.actions;

export default sellerSlice.reducer;