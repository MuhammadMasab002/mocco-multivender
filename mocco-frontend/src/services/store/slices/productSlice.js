import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    featuredProducts: [],
    bestSellingProducts: [],
    isLoading: true,
    isFeaturedLoading: false,
    isBestSellingLoading: false,
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

        // get all products (shop-specific)
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

        // get all products from the public catalog
        getAllProductsRequest: (state) => {
            state.isLoading = true;
        },
        getAllProductsSuccess: (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
            state.error = null;
        },
        getAllProductsFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get featured products (isFeatured === true)
        getFeaturedProductsRequest: (state) => {
            state.isFeaturedLoading = true;
        },
        getFeaturedProductsSuccess: (state, action) => {
            state.isFeaturedLoading = false;
            state.featuredProducts = action.payload;
            state.error = null;
        },
        getFeaturedProductsFail: (state, action) => {
            state.isFeaturedLoading = false;
            state.error = action.payload;
        },

        // get best-selling products
        getBestSellingProductsRequest: (state) => {
            state.isBestSellingLoading = true;
        },
        getBestSellingProductsSuccess: (state, action) => {
            state.isBestSellingLoading = false;
            state.bestSellingProducts = action.payload;
            state.error = null;
        },
        getBestSellingProductsFail: (state, action) => {
            state.isBestSellingLoading = false;
            state.error = action.payload;
        },

        // toggle isFeatured on a single product in the list
        toggleFeaturedSuccess: (state, action) => {
            const { id, isFeatured } = action.payload;
            const product = state.products.find((p) => p._id === id || p.id === id);
            if (product) product.isFeatured = isFeatured;

            if (isFeatured) {
                const alreadyIn = state.featuredProducts.some((p) => p._id === id || p.id === id);
                if (!alreadyIn && product) state.featuredProducts.push(product);
            } else {
                state.featuredProducts = state.featuredProducts.filter(
                    (p) => p._id !== id && p.id !== id
                );
            }
        },

        // delete product by id
        deleteProductRequest: (state) => {
            state.isLoading = true;
        },
        deleteProductSuccess: (state, action) => {
            state.isLoading = false;
            state.products = state.products.filter(
                (product) => product._id !== action.payload
            );
            state.featuredProducts = state.featuredProducts.filter(
                (product) => product._id !== action.payload
            );
            state.bestSellingProducts = state.bestSellingProducts.filter(
                (product) => product._id !== action.payload
            );
            state.error = null;
        },
        deleteProductFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Clear error utility
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    createProductRequest,
    createProductSuccess,
    createProductFail,
    getProductsRequest,
    getProductsSuccess,
    getProductsFail,
    getAllProductsRequest,
    getAllProductsSuccess,
    getAllProductsFail,
    getFeaturedProductsRequest,
    getFeaturedProductsSuccess,
    getFeaturedProductsFail,
    getBestSellingProductsRequest,
    getBestSellingProductsSuccess,
    getBestSellingProductsFail,
    toggleFeaturedSuccess,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFail,
    clearErrors,
} = productSlice.actions;

export default productSlice.reducer;
