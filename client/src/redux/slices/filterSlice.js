import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  areaCode: null,
  priceCode: null,
  page: 1,

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
    },
  },
});

// Action creators are generated for each case reducer function
export const { queryFilter } = filterSlice.actions;

export default filterSlice.reducer;

// Viet Async thunk o day
