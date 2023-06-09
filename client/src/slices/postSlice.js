import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetPostsLimit } from "../services/postService";

const initialState = {
  posts: [],
  count: 0,
  error: null,
  message: "",
};

// export const getAllPosts = createAsyncThunk(
//   "post/all",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await apiGetPosts(payload);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const getPostsLimit = createAsyncThunk(
  "post/limit",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiGetPostsLimit(payload);
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
      // .addCase(getAllPosts.fulfilled, (state, action) => {
      //   state.posts = action.payload;
      //   state.error = null;
      //   state.message = "Get all posts successfully";
      // })
      // .addCase(getAllPosts.rejected, (state, action) => {
      //   state.posts = [];
      //   state.error = action.payload;
      //   state.message = null;
      // })
      .addCase(getPostsLimit.fulfilled, (state, action) => {
        state.posts = action.payload.rows;
        state.count = action.payload.count;
        state.error = null;
        state.message = "Get all posts successfully";
      })
      .addCase(getPostsLimit.rejected, (state, action) => {
        state.posts = [];
        state.count = 0;
        state.error = action.payload;
        state.message = null;
      });
  },
});

// export const {} = postSlice.actions;

export default postSlice.reducer;
