import axios from "axios";
import { createProductRequest, createProductSuccess, createProductFail, getProductsRequest, getProductsSuccess, getProductsFail, deleteProductRequest, deleteProductSuccess, deleteProductFail } from "../slices/productSlice";


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
const getProducts = (shopId) => async (dispatch) => {
    try {
        dispatch(getProductsRequest());
        const { data } = await axios.get(`${backendUrl}/product/all/${shopId}`, 
        //     {
        //     withCredentials: true,
        // }
    );
        dispatch(getProductsSuccess(data.products));
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch products";
        dispatch(getProductsFail(message));
    }
}

// Delete product by id
const deleteProduct = (productId) => async (dispatch) => {
    try {
        dispatch(deleteProductRequest());
        const { data } = await axios.delete(`${backendUrl}/product/delete/${productId}`, {
            withCredentials: true,
        });
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
}

export { createProduct, getProducts, deleteProduct };