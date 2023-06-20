import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetNewPosts,
  apiGetPopularPosts,
  apiGetPostsAdmin,
  apiGetPostsFilter,
  apiGetPostsLimit,
} from "../services/postService";

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
export const getNewPosts = createAsyncThunk(
  "post/new-post",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiGetNewPosts(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getPopularPost = createAsyncThunk(
  "post/popular-post",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiGetPopularPosts(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPostsFilter = createAsyncThunk(
  "post/filter",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiGetPostsFilter(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getPostsAdmin = createAsyncThunk(
  "post/post-admin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiGetPostsAdmin();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  posts: [],
  currentUserPosts: [],
  popularPosts: [],
  currentUserPostsCount: 0,
  editPost: {},
  count: 0,
  totalPage: 0,
  postPerPage: process.env.REACT_APP_LIMIT_POST,
  newPosts: [],
  error: null,
  message: "",
};
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setEditPost: (state, action) => {
      state.editPost = action.payload;
    },
  },
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
        state.totalPage = Math.ceil(+action.payload.count / state.postPerPage);
        state.error = null;
        state.message = "Get all posts successfully";
      })
      .addCase(getPostsLimit.rejected, (state, action) => {
        state.posts = [];
        state.count = 0;
        state.totalPage = 0;
        state.error = action.payload;
        state.message = null;
      })
      .addCase(getNewPosts.fulfilled, (state, action) => {
        // state.posts = action.payload.rows;
        // state.count = action.payload.count;
        // state.totalPage = Math.ceil(+action.payload.count / state.postPerPage);
        // state.error = null;
        state.newPosts = action.payload;
        state.message = "Get new posts successfully";
      })
      .addCase(getNewPosts.rejected, (state, action) => {
        state.newPosts = [];
        state.error = action.payload;
        state.message = null;
      })
      .addCase(getPopularPost.fulfilled, (state, action) => {
        // state.posts = action.payload.rows;
        // state.count = action.payload.count;
        // state.totalPage = Math.ceil(+action.payload.count / state.postPerPage);
        // state.error = null;
        state.popularPosts = action.payload;
        state.message = "Get popular posts successfully";
      })
      .addCase(getPopularPost.rejected, (state, action) => {
        state.popularPosts = [];
        state.error = action.payload;
        state.message = null;
      })
      .addCase(getPostsFilter.fulfilled, (state, action) => {
        state.posts = action.payload.rows;
        state.count = action.payload.count;
        state.totalPage = Math.ceil(+action.payload.count / state.postPerPage);
        state.message = "Get post filter successfully";
        state.error = null;
      })
      .addCase(getPostsFilter.rejected, (state, action) => {
        state.posts = [];

        state.error = action.payload;
        state.totalPage = 0;
        state.message = null;
        state.count = 0;
      })
      .addCase(getPostsAdmin.fulfilled, (state, action) => {
        state.currentUserPosts = action.payload.rows;
        state.currentUserPostsCount = action.payload.count;
        state.totalPage = Math.ceil(+action.payload.count / state.postPerPage);
        state.message = "Get post admin successfully";
        state.error = null;
      })
      .addCase(getPostsAdmin.rejected, (state, action) => {
        state.currentUserPosts = [];
        state.error = action.payload;
        state.totalPage = 0;
        state.message = null;
        state.currentUserPostsCount = 0;
      });
  },
});

export const { setEditPost } = postSlice.actions;

export default postSlice.reducer;
