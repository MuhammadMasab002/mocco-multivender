import axios from "axios";
import { loadSellerFail, loadSellerRequest, loadSellerSuccess } from "../slices/sellerAuthSlice";


const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const loadSeller = () => async (dispatch) => {
    try {
        dispatch(loadSellerRequest()); // Using the slice action

        const { data } = await axios.get(`${backendUrl}/shop/get-seller`, {
            withCredentials: true,
        });

        dispatch(loadSellerSuccess(data.seller)); // Passing data to slice
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to load seller";

        dispatch(loadSellerFail(message));
    }
};