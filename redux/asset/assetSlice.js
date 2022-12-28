import { createSlice } from "@reduxjs/toolkit";
import { fetchAssetCategories } from "./assetActions";
let assetCategories;

if (typeof window !== "undefined") {
  assetCategories = JSON.parse(localStorage.getItem("assetCategories"));
}
const initialState = {
  loading: false,
  assetCategories: [],
  error: null,
  success: false,
};

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAssetCategories.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchAssetCategories.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.assetCategories = payload;
    },
    [fetchAssetCategories.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default assetsSlice.reducer;
