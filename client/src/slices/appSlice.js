import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetPrices } from "../services/appService";

const initialState = {
  prices: [],
  message: "",
};

export const getPrices = createAsyncThunk(
  "price/all",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiGetPrices(payload);
      // console.log(response);
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
        state.message = "Get prices successfully";
      })
      .addCase(getPrices.rejected, (state, action) => {
        state.prices = [];
        state.message = "Get prices failed";
      });
  },
});

export default appSlice.reducer;
