import { createSlice } from "@reduxjs/toolkit";

// Shipping methods available sitewide
export const SHIPPING_METHODS = [
  { id: "free", label: "Free Shipping", description: "7–20 Business Days", price: 0 },
  { id: "express", label: "Express Shipping", description: "1–3 Business Days", price: 9 },
];

const initialState = {
  // Shipping step
  selectedAddressId: null,  // _id of user's saved address
  shippingMethod: "free",   // "free" | "express"
  shippingPrice: 0,

  // Coupon
  couponCode: "",
  appliedCoupon: null,      // { _id, code, value, shop, product, ... }
  couponLoading: false,
  couponError: null,
  discountAmount: 0,

  // Totals (derived — computed from cart, shipping, coupon)
  subtotal: 0,
  total: 0,

  // General loading
  isLoading: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // Address selection
    setSelectedAddress(state, action) {
      state.selectedAddressId = action.payload;
    },

    // Shipping method
    setShippingMethod(state, action) {
      const method = SHIPPING_METHODS.find((m) => m.id === action.payload);
      if (method) {
        state.shippingMethod = method.id;
        state.shippingPrice = method.price;
      }
    },

    // Coupon code input change
    setCouponCode(state, action) {
      state.couponCode = action.payload;
      state.couponError = null;
    },

    // Apply coupon
    applyCouponRequest(state) {
      state.couponLoading = true;
      state.couponError = null;
    },
    applyCouponSuccess(state, action) {
      state.couponLoading = false;
      state.appliedCoupon = action.payload;
      state.couponError = null;
    },
    applyCouponFail(state, action) {
      state.couponLoading = false;
      state.couponError = action.payload;
      state.appliedCoupon = null;
      state.discountAmount = 0;
    },

    // Remove coupon — also recomputes total immediately from current state
    removeCoupon(state) {
      state.appliedCoupon = null;
      state.couponCode = "";
      state.couponError = null;
      state.discountAmount = 0;
      // Recompute grand total without discount
      state.total = Math.max(0, state.subtotal + state.shippingPrice);
    },

    // Update totals (called whenever cart, coupon, or shipping changes)
    updateTotals(state, action) {
      const { subtotal, cartItems } = action.payload;

      state.subtotal = subtotal;

      let discount = 0;

      if (state.appliedCoupon) {

        const coupon = state.appliedCoupon;

        // products eligible for this coupon
        const eligibleItems = cartItems.filter(
          item =>
            item?.productId?.shop?._id === coupon?.shop._id
        );

        const eligibleSubtotal = eligibleItems.reduce((total, item) => {

          const price =
            item.productId?.discount_price ||
            item.productId?.price ||
            0;

          return total + price * item.quantity;

        }, 0);

        if (eligibleSubtotal >= coupon.minAmount) {

          discount = (eligibleSubtotal * coupon.value) / 100;

          if (coupon.maxAmount) {
            discount = Math.min(discount, coupon.maxAmount);
          }

        } else {

          // Coupon no longer valid
          state.couponError =
            `Coupon is valid only for orders above $${coupon.minAmount}`;

          state.appliedCoupon = null;
        }
      }

      state.discountAmount = discount;

      state.total =
        subtotal -
        discount +
        state.shippingPrice;
    },

    // Reset entire checkout (e.g. after order placed)
    resetCheckout() {
      return initialState;
    },

    clearCheckoutError(state) {
      state.error = null;
    },
  },
});

export const {
  setSelectedAddress,
  setShippingMethod,
  setCouponCode,
  applyCouponRequest,
  applyCouponSuccess,
  applyCouponFail,
  removeCoupon,
  updateTotals,
  resetCheckout,
  clearCheckoutError,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
