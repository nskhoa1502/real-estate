import { createSlice } from "@reduxjs/toolkit";
import { getPostsLimit } from "./postSlice";

const initialState = {
  areaCode: null,
  priceCode: null,
  page: 1,
  categoryCode: null,
  message: "",
  error: null,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    queryFilter: (state, action) => {
      state.areaCode = action.payload?.areaCode || null;
      state.priceCode = action.payload?.priceCode || null;
      state.page = action.payload?.page || 1;
      state.categoryCode = action.payload?.categoryCode;
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
        state.areaCode = null;
        state.priceCode = null;
        state.page = 1;
        state.categoryCode = null;
        state.error = null;
        state.message = "Get all posts successfully";
      })
      .addCase(getPostsLimit.rejected, (state, action) => {
        state.posts = [];
        state.count = 0;
        state.totalPage = 0;
        state.error = action.payload;
        state.message = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { queryFilter } = filterSlice.actions;

export default filterSlice.reducer;

// Viet Async thunk o day
