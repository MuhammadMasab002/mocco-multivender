import axios from "axios";
import { createProductRequest, createProductSuccess, createProductFail } from "../slices/productSlice";


const backendUrl = import.meta.env.VITE_BACKEND_URL;


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

export { createProduct };