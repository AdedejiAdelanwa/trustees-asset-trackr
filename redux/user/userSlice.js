// import { createSlice } from "@reduxjs/toolkit";
// import { signupUser } from "./userActions";

// const initialState = {
//   loading: false,
//   userInfo: {},
//   userToken: null,
//   error: null,
//   success: false,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(signupUser.pending, (state, { payload }) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(signupUser.fulfilled, (state) => {
//       state.loading = false;
//       state.error = null;
//       state.success = true;
//     });
//     builder.addCase(signupUser.rejected, (state, { payload }) => {
//       state.loading = false;
//       state.error = payload;
//     });
//   },

// });

// export default userSlice.reducer;
