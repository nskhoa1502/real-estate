import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCategories } from "../../services/categoryService";

const initialState = {
  categories: [],
  message: "",
};

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

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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

export default categorySlice.reducer;
