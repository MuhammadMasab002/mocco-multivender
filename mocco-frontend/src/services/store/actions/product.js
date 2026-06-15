import axios from "axios";
import {
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
} from "../slices/productSlice";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Normalize a product from the API (ensure id + image_Url exist)
const normalizeProduct = (product) => ({
    ...product,
    id: product?._id,
    image_Url: product?.images || product?.image_Url || [],
});

// Create a new product
const createProduct = (productFormData) => async (dispatch) => {
    try {
        dispatch(createProductRequest());

        const { data } = await axios.post(
            `${backendUrl}/product/create`,
            productFormData,
            {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            }
        );
        dispatch(createProductSuccess(data.product));
        return data;
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to create product";
        dispatch(createProductFail(message));
        throw new Error(message);
    }
};

// Get all products of a specific shop
const getProducts = (shopId) => async (dispatch) => {
    try {
        dispatch(getProductsRequest());
        const { data } = await axios.get(`${backendUrl}/product/all/${shopId}`);
        dispatch(getProductsSuccess(data.products));
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch products";
        dispatch(getProductsFail(message));
    }
};

// Get all products from the public catalog
const getAllProducts = () => async (dispatch) => {
    try {
        dispatch(getAllProductsRequest());

        const { data } = await axios.get(`${backendUrl}/product/all`);

        const normalizedProducts = (
            Array.isArray(data?.products) ? data.products : []
        ).map(normalizeProduct);

        dispatch(getAllProductsSuccess(normalizedProducts));
        return normalizedProducts;
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch all products";
        dispatch(getAllProductsFail(message));
        throw new Error(message);
    }
};

// Get only featured products (isFeatured === true)
const getFeaturedProducts = () => async (dispatch) => {
    try {
        dispatch(getFeaturedProductsRequest());

        const { data } = await axios.get(`${backendUrl}/product/featured`);

        const normalizedProducts = (
            Array.isArray(data?.products) ? data.products : []
        ).map(normalizeProduct);

        dispatch(getFeaturedProductsSuccess(normalizedProducts));
        return normalizedProducts;
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch featured products";
        dispatch(getFeaturedProductsFail(message));
        throw new Error(message);
    }
};

// Get best-selling products from the dedicated endpoint
const getBestSellingProducts = (limit = 0) => async (dispatch) => {
    try {
        dispatch(getBestSellingProductsRequest());

        const params = limit > 0 ? `?limit=${limit}` : "";
        const { data } = await axios.get(`${backendUrl}/product/best-selling${params}`);

        const normalizedProducts = (
            Array.isArray(data?.products) ? data.products : []
        ).map(normalizeProduct);

        dispatch(getBestSellingProductsSuccess(normalizedProducts));
        return normalizedProducts;
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch best-selling products";
        dispatch(getBestSellingProductsFail(message));
        throw new Error(message);
    }
};

// Toggle isFeatured on a product (seller only)
const toggleFeatured = (productId) => async (dispatch) => {
    try {
        const { data } = await axios.patch(
            `${backendUrl}/product/toggle-featured/${productId}`,
            {},
            { withCredentials: true }
        );
        dispatch(
            toggleFeaturedSuccess({ id: productId, isFeatured: data.isFeatured })
        );
        return data;
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to toggle featured status";
        throw new Error(message);
    }
};

// Delete product by id
const deleteProduct = (productId) => async (dispatch) => {
    try {
        dispatch(deleteProductRequest());
        const { data } = await axios.delete(
            `${backendUrl}/product/delete/${productId}`,
            { withCredentials: true }
        );
        dispatch(deleteProductSuccess(productId));
        return data;
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to delete product";
        dispatch(deleteProductFail(message));
        throw new Error(message);
    }
};

export {
    createProduct,
    getProducts,
    getAllProducts,
    getFeaturedProducts,
    getBestSellingProducts,
    toggleFeatured,
    deleteProduct,
};