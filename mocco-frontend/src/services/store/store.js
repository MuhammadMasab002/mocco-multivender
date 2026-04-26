import { configureStore } from "@reduxjs/toolkit";
import { MoccoMartApi } from "../api";
import userReducer from "./slices/userAuthSlice";
import sellerReducer from "./slices/sellerAuthSlice";
import productReducer from "./slices/productSlice";
import eventReducer from "./slices/eventSlice";

export const store = configureStore({
  reducer: {
    [MoccoMartApi.reducerPath]: MoccoMartApi.reducer,
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    event: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MoccoMartApi.middleware),
});
