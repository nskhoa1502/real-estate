import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetPrices,
  apiGetAreas,
  apiGetCategories,
  apiGetProvinces,
} from "../services/appService";

//Refactor later

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
export const getProvinces = createAsyncThunk(
  "province/all",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiGetProvinces(payload);
      //   console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  provinces: [],
  prices: [],
  categories: [],
  areas: [],
  message: "",
};

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
      })
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.provinces = action.payload;
        state.message = "Get provinces successfully";
      })
      .addCase(getProvinces.rejected, (state, action) => {
        state.provinces = [];
        state.message = "Get provinces failed";
      });
  },
});

export default appSlice.reducer;
