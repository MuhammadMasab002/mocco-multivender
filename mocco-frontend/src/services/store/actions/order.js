import axios from "axios";
import {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFail,
  fetchShopOrdersRequest,
  fetchShopOrdersSuccess,
  fetchShopOrdersFail,
  updateStatusRequest,
  updateStatusSuccess,
  updateStatusFail,
} from "../slices/orderSlice";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ── GET /api/v1/order/my-orders (user) ─────────────────────────────────────────
const getMyOrders = () => async (dispatch) => {
  try {
    dispatch(fetchOrdersRequest());
    const { data } = await axios.get(`${backendUrl}/order/my-orders`, {
      withCredentials: true,
    });
    dispatch(fetchOrdersSuccess(data.orders));
    return data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to fetch orders";
    dispatch(fetchOrdersFail(message));
    toast.error(message);
  }
};

// ── GET /api/v1/order/shop-orders (seller) ─────────────────────────────────────
const getShopOrders = () => async (dispatch) => {
  try {
    dispatch(fetchShopOrdersRequest());
    const { data } = await axios.get(`${backendUrl}/order/shop-orders`, {
      withCredentials: true,
    });
    dispatch(fetchShopOrdersSuccess(data.orders));
    return data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to fetch shop orders";
    dispatch(fetchShopOrdersFail(message));
    toast.error(message);
  }
};

// ── PATCH /api/v1/order/:id/status (seller) ────────────────────────────────────
const updateOrderStatus = (orderId, status) => async (dispatch) => {
  try {
    dispatch(updateStatusRequest());
    const { data } = await axios.patch(
      `${backendUrl}/order/${orderId}/status`,
      { status },
      { withCredentials: true }
    );
    dispatch(updateStatusSuccess(data.order));
    toast.success(data.message || "Order status updated");
    return data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to update order status";
    dispatch(updateStatusFail(message));
    toast.error(message);
    throw error;
  }
};

export { getMyOrders, getShopOrders, updateOrderStatus };
