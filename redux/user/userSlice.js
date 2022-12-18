import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./userActions";
let userDetails;
let userToken;

if (typeof window !== "undefined") {
  userDetails =
    localStorage.getItem("userDetails") !== null
      ? JSON.parse(window.localStorage.getItem("userDetails"))
      : null;

  userToken =
    localStorage.getItem("userToken") !== null
      ? JSON.parse(window.localStorage.getItem("userToken"))
      : null;
}

const initialState = {
  loading: false,
  userDetails,
  userToken,
  error: null,
  success: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.userDetails = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("userDetails");
      }
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userDetails = payload.userDetails;
      state.userToken = payload.userToken;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
