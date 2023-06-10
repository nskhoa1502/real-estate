import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetPrices, apiGetAreas } from "../services/appService";

const initialState = {
  prices: [],
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

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAreas.fulfilled, (state, action) => {
        state.areas = action.payload;
        state.message = "Get areas successfully";
      })
      .addCase(getAreas.rejected, (state, action) => {
        state.areas = [];
        state.message = "Get areas failed";
      });
  },
});

export default appSlice.reducer;
