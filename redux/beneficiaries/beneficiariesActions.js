import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../util";

export const fetchBeneficiaries = createAsyncThunk(
  "beneficiaries/fetchbeneficiaries",
  async (userToken, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios({
        method: "get",
        url: `${baseUrl}/beneficiary/list`,
        headers: { Authorization: "Bearer " + userToken },
      });
      const userBeneficiaries = data;
      localStorage.setItem(
        "userBeneficiaries",
        JSON.stringify(userBeneficiaries)
      );
      return userBeneficiaries;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
