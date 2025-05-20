import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/login/success`,
        {
          withCredentials: true,
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Google login - initiates the OAuth flow
export const loginWithGoogle = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    } catch (error) {
      return rejectWithValue(error.message);
      console.log(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get("/auth/logout", { withCredentials: true });
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async ({ id, avatar }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/avatar/${id}`,
        { avatar },
        { withCredentials: true }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ id, data }) => {
    try {
      console.log("Updating user with ID:", id);
      console.log("New user data:", data);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/update/user/${id}`,
        { data }
      );
      return response?.data;
    } catch (error) {
      return console.log(error.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Check auth status cases
    builder.addCase(checkAuthStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(checkAuthStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data;
      state.error = null;
    });
    builder.addCase(checkAuthStatus.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload || "Failed to check authentication status";
    });

    // Google login cases
    builder.addCase(loginWithGoogle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginWithGoogle.fulfilled, (state) => {
      state.loading = false;
      // The actual user data will be set by checkAuthStatus after redirect
    });
    builder.addCase(loginWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Google login failed";
    });

    // Logout cases
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    });
    builder
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      })
      .addCase(updateAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data;
      state.error = null;
    });
    builder
      .addCase(updateAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update avatar";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to update user";
    });
  },
});

export default authSlice.reducer;
