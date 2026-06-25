import axios from "axios";
import {
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail
} from "../slices/userAuthSlice";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const loadUser = () => async (dispatch) => {
    try {
        dispatch(loadUserRequest()); // Using the slice action

        const { data } = await axios.get(`${backendUrl}/user`, {
            withCredentials: true,
        });

        dispatch(loadUserSuccess(data.user)); // Passing data to slice
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to load user";

        dispatch(loadUserFail(message));
    }
};

export const updateProfile = (formData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());

        const { data } = await axios.put(`${backendUrl}/user/update-profile`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        dispatch(updateProfileSuccess(data.user));
        return { success: true, message: data.message };
    } catch (error) {
        const message = error?.response?.data?.message || error?.message || "Failed to update profile";
        dispatch(updateProfileFail(message));
        return { success: false, message };
    }
};

export const updatePassword = (passwordData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());

        const { data } = await axios.put(`${backendUrl}/user/update-password`, passwordData, {
            withCredentials: true
        });

        dispatch(updateProfileSuccess(undefined)); // Keep existing user state intact
        return { success: true, message: data.message };
    } catch (error) {
        const message = error?.response?.data?.message || error?.message || "Failed to update password";
        dispatch(updateProfileFail(message));
        return { success: false, message };
    }
};

export const addAddress = (addressData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());

        const { data } = await axios.post(`${backendUrl}/user/add-address`, addressData, {
            withCredentials: true
        });

        dispatch(updateProfileSuccess(data.user));
        return { success: true, message: data.message };
    } catch (error) {
        const message = error?.response?.data?.message || error?.message || "Failed to add address";
        dispatch(updateProfileFail(message));
        return { success: false, message };
    }
};

export const deleteAddress = (addressId) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());

        const { data } = await axios.delete(`${backendUrl}/user/delete-address/${addressId}`, {
            withCredentials: true
        });

        dispatch(updateProfileSuccess(data.user));
        return { success: true, message: data.message };
    } catch (error) {
        const message = error?.response?.data?.message || error?.message || "Failed to delete address";
        dispatch(updateProfileFail(message));
        return { success: false, message };
    }
};