import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetPosts } from "../services/postService";

const initialState = {
  posts: [],
  error: null,
  message: "",
};

export const getAllPosts = createAsyncThunk(
  "post/all",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiGetPosts(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.error = null;
        state.message = "Get all posts successfully";
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.posts = [];
        state.error = action.payload;
        state.message = null;
      });
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
