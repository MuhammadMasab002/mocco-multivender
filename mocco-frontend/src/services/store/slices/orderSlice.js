import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // User orders (my-orders)
  orders: [],
  ordersLoading: false,
  ordersError: null,

  // Shop orders (shop-orders)
  shopOrders: [],
  shopOrdersLoading: false,
  shopOrdersError: null,

  // Single order detail
  currentOrder: null,
  currentOrderLoading: false,
  currentOrderError: null,

  // Status update
  updateStatusLoading: false,
  updateStatusError: null,

  // Refunds
  refunds: [],
  refundsLoading: false,
  requestRefundLoading: false,
  refundError: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // ── My Orders ──────────────────────────────────────
    fetchOrdersRequest(state) {
      state.ordersLoading = true;
      state.ordersError = null;
    },
    fetchOrdersSuccess(state, action) {
      state.ordersLoading = false;
      state.orders = action.payload;
    },
    fetchOrdersFail(state, action) {
      state.ordersLoading = false;
      state.ordersError = action.payload;
    },

    // ── Shop Orders ────────────────────────────────────
    fetchShopOrdersRequest(state) {
      state.shopOrdersLoading = true;
      state.shopOrdersError = null;
    },
    fetchShopOrdersSuccess(state, action) {
      state.shopOrdersLoading = false;
      state.shopOrders = action.payload;
    },
    fetchShopOrdersFail(state, action) {
      state.shopOrdersLoading = false;
      state.shopOrdersError = action.payload;
    },

    // ── Update Order Status ────────────────────────────
    updateStatusRequest(state) {
      state.updateStatusLoading = true;
      state.updateStatusError = null;
    },
    updateStatusSuccess(state, action) {
      state.updateStatusLoading = false;
      const updated = action.payload;
      // Sync in both lists
      state.shopOrders = state.shopOrders.map((o) =>
        o._id === updated._id ? updated : o
      );
      state.orders = state.orders.map((o) =>
        o._id === updated._id ? updated : o
      );
    },
    updateStatusFail(state, action) {
      state.updateStatusLoading = false;
      state.updateStatusError = action.payload;
    },

    // ── Refund Reducers ────────────────────────────────
    requestRefundRequest(state) {
      state.requestRefundLoading = true;
      state.refundError = null;
    },
    requestRefundSuccess(state, action) {
      state.requestRefundLoading = false;
      const { refund, order } = action.payload || {};
      if (refund) {
        state.refunds = [refund, ...state.refunds];
      }
      if (order) {
        state.orders = state.orders.map((o) =>
          o._id === order._id ? order : o
        );
      }
    },
    requestRefundFail(state, action) {
      state.requestRefundLoading = false;
      state.refundError = action.payload;
    },

    fetchRefundsRequest(state) {
      state.refundsLoading = true;
      state.refundError = null;
    },
    fetchRefundsSuccess(state, action) {
      state.refundsLoading = false;
      state.refunds = action.payload;
    },
    fetchRefundsFail(state, action) {
      state.refundsLoading = false;
      state.refundError = action.payload;
    },

    // ── Clear errors ───────────────────────────────────
    clearOrderErrors(state) {
      state.ordersError = null;
      state.shopOrdersError = null;
      state.updateStatusError = null;
      state.refundError = null;
    },
  },
});

export const {
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
  clearOrderErrors,
} = orderSlice.actions;

export default orderSlice.reducer;
