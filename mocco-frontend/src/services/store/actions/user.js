import axios from "axios";
import {
    loadUserRequest,
    loadUserSuccess,
    loadUserFail
} from "../slices/userAuthSlice";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const loadUser = () => async (dispatch) => {
    try {
        dispatch(loadUserRequest()); // Using the slice action

        const { data } = await axios.get(`${backendUrl}/user/get-user`, {
            withCredentials: true,
        });

        dispatch(loadUserSuccess(data.user)); // Passing data to slice
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message));
    }
};