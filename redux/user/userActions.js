// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { baseUrl } from "../../util";
// export const signupUser = createAsyncThunk(
//   "user/signup",
//   async (
//     { surname, othernames, email, phone_number, password },
//     { rejectWithValue }
//   ) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       await axios.post(
//         `${baseUrl}/user/create`,
//         { surname, othernames, email, phone_number, password },
//         config
//       );
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
