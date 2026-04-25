import { configureStore } from "@reduxjs/toolkit";
import { MoccoMartApi } from "../api";
import userReducer from "./slices/userAuthSlice";
import sellerReducer from "./slices/sellerAuthSlice";
import productReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    [MoccoMartApi.reducerPath]: MoccoMartApi.reducer,
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MoccoMartApi.middleware),
});
