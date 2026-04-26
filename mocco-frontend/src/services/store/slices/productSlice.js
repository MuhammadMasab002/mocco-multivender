import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    isLoading: true,
    error: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        // create product
        createProductRequest: (state) => {
            state.isLoading = true;
        },
        createProductSuccess: (state, action) => {
            state.isLoading = false;
            state.products.push(action.payload);
            state.error = null;
        },
        createProductFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // get all products
        getProductsRequest: (state) => {
            state.isLoading = true;
        },
        getProductsSuccess: (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
            state.error = null;
        },
        getProductsFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // Clear error utility
        clearErrors: (state) => {
            state.error = null;
        }
    },
});

export const {
    createProductRequest,
    createProductSuccess,
    createProductFail,
    getProductsRequest,
    getProductsSuccess,
    getProductsFail,
    clearErrors
} = productSlice.actions;

export default productSlice.reducer;
