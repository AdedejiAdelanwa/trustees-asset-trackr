import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../util";
export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const {
        headers: { token },
        data: {
          data: { userDetails },
        },
      } = await axios.post(`${baseUrl}/login`, { email, password }, config);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      localStorage.setItem("userToken", JSON.stringify(token));

      return { userDetails, token };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
