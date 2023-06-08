import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiLogin, apiRegister } from "../services/authService";

const initialState = {
  isLoggedIn: false,
  token: null,
  error: null,
  message: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiRegister(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiLogin(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // Handle logout action
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload;
        state.error = null;
        state.message = "Đăng ký thành công";
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload;
        state.error = null;
        state.message = "Đăng nhập thành công";
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.message = null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
