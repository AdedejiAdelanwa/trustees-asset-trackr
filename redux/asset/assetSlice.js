import { createSlice } from "@reduxjs/toolkit";
import { fetchAssetCategories } from "./assetActions";
import { fetchUserAssets } from "./assetActions";
import { userLogin } from "../user/userActions";
let assetCategories;
let userStatistics;
let assetDetails;

if (typeof window !== "undefined") {
  assetCategories = JSON.parse(localStorage.getItem("assetCategories"));
  userStatistics = JSON.parse(localStorage.getItem("userStatistics"));
  assetDetails = JSON.parse(localStorage.getItem("assetDetails"));
}
const initialState = {
  loading: false,
  assetCategories: [],
  userAssets: [],
  userStatistics,
  assetDetails,
  error: null,
  success: false,
};

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {},
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userStatistics = payload.statistics;
      state.assetDetails = payload.assetsDetails;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
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
    [fetchUserAssets.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchUserAssets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userAssets = payload;
    },
    [fetchUserAssets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default assetsSlice.reducer;
