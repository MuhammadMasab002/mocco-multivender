import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // These replace your LoadUserRequest, LoadUserSuccess, etc.
    loadUserRequest: (state) => {
      state.isLoading = true;
    },
    loadUserSuccess: (state, action) => {
      state.isLoading = false;
      state.isUserAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isUserAuthenticated = false;
    },
    // Clear error utility
    clearErrors: (state) => {
      state.error = null;
    }
  },
});

export const {
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  clearErrors
} = userSlice.actions;

export default userSlice.reducer;