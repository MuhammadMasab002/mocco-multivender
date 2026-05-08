import axios from "axios";
import { createCouponFail, createCouponRequest, createCouponSuccess, deleteCouponFail, deleteCouponRequest, deleteCouponSuccess, getCouponsFail, getCouponsRequest, getCouponsSuccess } from "../slices/couponSlice";


const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Create a new coupon
const createCoupon = (couponFormData) => async (dispatch) => {
    try {

        dispatch(createCouponRequest());

        const { data } = await axios.post(`${backendUrl}/coupon/create`, couponFormData, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        dispatch(createCouponSuccess(data.coupon));
        return data;

    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to create coupon";

        dispatch(createCouponFail(message));
        throw new Error(message);
    }
}

// Get all coupons
const getCoupons = (shopId) => async (dispatch) => {
    try {
        dispatch(getCouponsRequest());
        const { data } = await axios.get(`${backendUrl}/coupon/all/${shopId}`,
            //     {
            //     withCredentials: true,
            // }
        );
        dispatch(getCouponsSuccess(data.coupons));
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch coupons";
        dispatch(getCouponsFail(message));
    }
}

// Delete coupon by id
const deleteCoupon = (couponId) => async (dispatch) => {
    try {
        dispatch(deleteCouponRequest());
        const { data } = await axios.delete(`${backendUrl}/coupon/delete/${couponId}`, {
            withCredentials: true,
        });
        dispatch(deleteCouponSuccess(couponId));
        return data;
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to delete coupon";
        dispatch(deleteCouponFail(message));
        throw new Error(message);
    }
}

export { createCoupon, getCoupons, deleteCoupon };