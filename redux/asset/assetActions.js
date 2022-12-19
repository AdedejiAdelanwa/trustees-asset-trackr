import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../util";

export const fetchAssetCategories = createAsyncThunk(
  "assets/fetchAssetCategories",
  async (userToken, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios({
        method: "get",
        url: `${baseUrl}/assets/category`,
        headers: { Authorization: "Bearer " + userToken },
      });
      const assetCategories = data;
      localStorage.setItem("assetCategories", JSON.stringify(assetCategories));
      return assetCategories;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
