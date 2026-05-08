import { configureStore } from "@reduxjs/toolkit";
import { MoccoMartApi } from "../api";
import userReducer from "./slices/userAuthSlice";
import sellerReducer from "./slices/sellerAuthSlice";
import productReducer from "./slices/productSlice";
import eventReducer from "./slices/eventSlice";
import couponReducer from "./slices/couponSlice";

export const store = configureStore({
  reducer: {
    [MoccoMartApi.reducerPath]: MoccoMartApi.reducer,
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    event: eventReducer,
    coupon: couponReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MoccoMartApi.middleware),
});
