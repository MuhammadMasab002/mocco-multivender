import { configureStore } from "@reduxjs/toolkit";
import { MoccoMartApi } from "../api";
import userReducer from "./slices/userAuthSlice";
import sellerReducer from "./slices/sellerAuthSlice";

export const store = configureStore({
  reducer: {
    [MoccoMartApi.reducerPath]: MoccoMartApi.reducer,
    user: userReducer,
    seller: sellerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MoccoMartApi.middleware),
});
