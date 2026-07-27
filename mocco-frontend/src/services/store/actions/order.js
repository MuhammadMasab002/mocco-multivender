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
  requestRefundRequest,
  requestRefundSuccess,
  requestRefundFail,
  fetchRefundsRequest,
  fetchRefundsSuccess,
  fetchRefundsFail,
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

// ── POST /api/v1/order/refund (user) ─────────────────────────────────────────
const requestRefund = ({ orderId, reason }) => async (dispatch) => {
  try {
    dispatch(requestRefundRequest());
    const { data } = await axios.post(
      `${backendUrl}/order/refund`,
      { orderId, reason },
      { withCredentials: true }
    );
    dispatch(requestRefundSuccess({ refund: data.refund, order: data.order }));
    toast.success(data.message || "Refund request submitted!");
    // Refresh user orders to get updated order status everywhere
    dispatch(getMyOrders());
    return data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to request refund";
    dispatch(requestRefundFail(message));
    toast.error(message);
    throw error;
  }
};

// ── GET /api/v1/order/my-refunds (user) ─────────────────────────────────────────
const getMyRefunds = () => async (dispatch) => {
  try {
    dispatch(fetchRefundsRequest());
    const { data } = await axios.get(`${backendUrl}/order/my-refunds`, {
      withCredentials: true,
    });
    dispatch(fetchRefundsSuccess(data.refunds));
    return data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to fetch refund requests";
    dispatch(fetchRefundsFail(message));
    toast.error(message);
  }
};

export { getMyOrders, getShopOrders, updateOrderStatus, requestRefund, getMyRefunds };
