import { configureStore } from "@reduxjs/toolkit";
import { MoccoMartApi } from "../api";
import userReducer from "./slices/userAuthSlice";
import sellerReducer from "./slices/sellerAuthSlice";
import productReducer from "./slices/productSlice";
import eventReducer from "./slices/eventSlice";
import couponReducer from "./slices/couponSlice";
import wishlistReducer from "./slices/wishlistSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    [MoccoMartApi.reducerPath]: MoccoMartApi.reducer,
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    event: eventReducer,
    coupon: couponReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MoccoMartApi.middleware),
});

