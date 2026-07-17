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

  // Single order detail (shared for both user detail view and seller detail view)
  currentOrder: null,
  currentOrderLoading: false,
  currentOrderError: null,

  // Status update
  updateStatusLoading: false,
  updateStatusError: null,
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

    // ── Clear errors ───────────────────────────────────
    clearOrderErrors(state) {
      state.ordersError = null;
      state.shopOrdersError = null;
      state.updateStatusError = null;
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
  clearOrderErrors,
} = orderSlice.actions;

export default orderSlice.reducer;
