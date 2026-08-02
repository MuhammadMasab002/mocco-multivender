import axios from "axios";
import {
    loadSellerFail,
    loadSellerRequest,
    loadSellerSuccess,
    updateSellerFail,
    updateSellerRequest,
    updateSellerSuccess,
} from "../slices/sellerAuthSlice";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const loadSeller = () => async (dispatch) => {
    try {
        dispatch(loadSellerRequest()); // Using the slice action

        const { data } = await axios.get(`${backendUrl}/shop/seller`, {
            withCredentials: true,
        });

        dispatch(loadSellerSuccess(data.shop)); // Support both payload keys
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to load seller";

        dispatch(loadSellerFail(message));
    }
};

export const updateSellerInfo = (formData) => async (dispatch) => {
    try {
        dispatch(updateSellerRequest());

        const { data } = await axios.put(
            `${backendUrl}/shop/update-seller-info`,
            formData,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        dispatch(updateSellerSuccess(data.shop));
        return { success: true, message: data.message || "Shop updated successfully!", shop: data.shop };
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to update shop info";

        dispatch(updateSellerFail(message));
        return { success: false, message };
    }
};