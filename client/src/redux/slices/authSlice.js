import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiLogin, apiRegister } from "../../services/authService";

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
      // console.log(response.data);
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
// export const logout = createAsyncThunk(
//   "auth/logout",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await apiLogin(payload);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.error = null;
      state.message = "Đăng xuất thành công";
    },
    resetPopup: (state) => {
      state.message = null;
      state.error = null;
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
        state.error = "Đăng ký thất bại";
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload;
        state.error = null;
        state.message = "Đăng nhập thành công";
      })
      .addCase(login.rejected, (state, action) => {
        state.error = "Đăng nhập thất bại";
        state.message = null;
      });
    // .addCase(logout.fulfilled, (state) => {
    //   state.isLoggedIn = false;
    //   state.error = null;
    //   state.message = "Đăng xuất thành công";
    // })
    // .addCase(logout.rejected, (state, action) => {
    //   state.isLoggedIn = false;
    //   state.error = action.payload;
    //   state.message = "Đăng xuất thất bại";
    // });
  },
});

export const { logout, resetPopup } = authSlice.actions;

export default authSlice.reducer;
