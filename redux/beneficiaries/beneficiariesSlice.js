import { createSlice } from "@reduxjs/toolkit";
import { fetchBeneficiaries } from "./beneficiariesActions";
let userBeneficiaries;

if (typeof window !== "undefined") {
  userBeneficiaries = JSON.parse(localStorage.getItem("userBeneficiaries"));
}

const initialState = {
  loading: false,
  userBeneficiaries: [],
  error: null,
  success: false,
};

const userBeneficiariesSlice = createSlice({
  name: "beneficiaries",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBeneficiaries.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchBeneficiaries.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userBeneficiaries = payload;
    },
    [fetchBeneficiaries.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default userBeneficiariesSlice.reducer;
