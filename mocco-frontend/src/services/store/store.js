import { configureStore } from "@reduxjs/toolkit";
import { MoccoMartApi } from "../api";
import authReducer from "./slices/authSlice.js";

export const store = configureStore({
  reducer: {
    [MoccoMartApi.reducerPath]: MoccoMartApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MoccoMartApi.middleware),
});
