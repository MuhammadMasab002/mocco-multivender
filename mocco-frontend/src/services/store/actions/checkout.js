import axios from "axios";
import {
  applyCouponRequest,
  applyCouponSuccess,
  applyCouponFail,
  updateTotals,
} from "../slices/checkoutSlice";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

/**
 * Validate a coupon code against current subtotal.
 * Dispatches success/fail and then re-computes totals.
 */
export const validateCoupon = (couponCode, subtotal, cartItems) => async (dispatch) => {
  try {
    dispatch(applyCouponRequest());

    const { data } = await axios.post(
      `${backendUrl}/coupon/validate`,
      { couponCode, subtotal, cartItems },
      { withCredentials: true }
    );

    dispatch(applyCouponSuccess(data.coupon));

    dispatch(
      updateTotals({
        subtotal,
        cartItems,
      })
    );

    return data; // Return the response data for further handling in the component
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Invalid coupon code";
    dispatch(applyCouponFail(message));
    return { success: false, message };
  }
};
