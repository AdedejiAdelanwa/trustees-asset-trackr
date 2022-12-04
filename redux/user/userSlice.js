import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./userActions";
let userDetails;
if (typeof window !== "undefined") {
  userDetails = JSON.parse(
    localStorage.getItem("userDetails")
      ? localStorage.getItem("userDetails")
      : null
  );
}

const initialState = {
  loading: false,
  userDetails,
  userToken: null,
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
      state.userDetails = payload;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
