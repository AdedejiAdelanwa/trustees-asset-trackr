import { createSlice } from "@reduxjs/toolkit";
import { fetchEstatePlans } from "./estatePlansActions";
let estatePlans;

if (typeof window !== "undefined") {
  estatePlans = JSON.parse(localStorage.getItem("userEstatePlans"));
}

const initialState = {
  loading: false,
  estatePlans: [],
  error: null,
  success: false,
};

const estatePlansSlice = createSlice({
  name: "estatePlans",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEstatePlans.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchEstatePlans.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.estatePlans = payload;
    },
    [fetchEstatePlans.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default estatePlansSlice.reducer;
