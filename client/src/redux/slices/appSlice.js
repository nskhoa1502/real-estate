import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetPrices,
  apiGetAreas,
  apiGetCategories,
} from "../services/appService";

const initialState = {
  prices: [],
  categories: [],
  areas: [],
  message: "",
};

export const getPrices = createAsyncThunk(
  "price/all",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiGetPrices(payload);
      // console.log(response);
      return response.data.sort((a, b) => +a.order - +b.order);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAreas = createAsyncThunk(
  "area/all",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiGetAreas(payload);
      // console.log(response);
      return response.data.sort((a, b) => +a.order - +b.order);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategories = createAsyncThunk(
  "category/all",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiGetCategories(payload);
      //   console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPrices.fulfilled, (state, action) => {
        state.prices = action.payload;
        state.message = "Get areas successfully";
      })
      .addCase(getPrices.rejected, (state, action) => {
        state.prices = [];
        state.message = "Get areas failed";
      })
      .addCase(getAreas.fulfilled, (state, action) => {
        state.areas = action.payload;
        state.message = "Get areas successfully";
      })
      .addCase(getAreas.rejected, (state, action) => {
        state.areas = [];
        state.message = "Get areas failed";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.message = "Get categories successfully";
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.categories = [];
        state.message = "Get categories failed";
      });
  },
});

export default appSlice.reducer;
