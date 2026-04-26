import axios from "axios";
import { createProductRequest, createProductSuccess, createProductFail, getProductsRequest, getProductsSuccess, getProductsFail } from "../slices/productSlice";


const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Create a new product
const createProduct = (productFormData) => async (dispatch) => {
    try {

        dispatch(createProductRequest());

        const { data } = await axios.post(`${backendUrl}/product/create`, productFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });
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
}

// Get all products
const getProducts = () => async (dispatch) => {
    try {
        dispatch(getProductsRequest());
        const { data } = await axios.get(`${backendUrl}/product/all`, {
            withCredentials: true,
        });
        dispatch(getProductsSuccess(data.products));
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch products";
        dispatch(getProductsFail(message));
    }
}

export { createProduct, getProducts };