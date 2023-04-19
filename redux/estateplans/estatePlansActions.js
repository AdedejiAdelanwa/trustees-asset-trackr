import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../util";

export const fetchEstatePlans = createAsyncThunk(
  "estatePlans/fetchEstatePlans",
  async (userToken, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios({
        method: "get",
        url: `${baseUrl}/estate-plans`,
        headers: { Authorization: "Bearer " + userToken },
      });
      localStorage.setItem("userEstatePlans", JSON.stringify(data));
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
