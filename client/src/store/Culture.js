import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/culture/culture`;

// Async thunk for creating a new culture entry
export const createCultureByAdmin = createAsyncThunk(
  "cultures/createCulture/admin",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/create/admin`, formData);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Culture entry creation failed: " + error.message
      );
    }
  }
);
// Async thunk for creating a new culture entry
export const createCultureByUser = createAsyncThunk(
  "cultures/createCulture",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/create/user`, formData);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Culture entry creation failed: " + error.message
      );
    }
  }
);

// Async thunk for fetching all culture entries
export const getCultures = createAsyncThunk(
  "cultures/getCultures",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/culture/get/all`
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch culture entries: " + error.message
      );
    }
  }
);

// Async thunk for fetching a single culture entry by ID
export const getCultureById = createAsyncThunk(
  "cultures/getCultureById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/get/${id}`);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch culture entry: " + error.message
      );
    }
  }
);

// Async thunk for updating a culture entry
export const updateCulture = createAsyncThunk(
  "cultures/updateCulture",
  async ({ id, status }, thunkAPI) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/update/${id}`, { status });
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Culture entry update failed: " + error.message
      );
    }
  }
);

export const uploadFile = createAsyncThunk(
  "alphabets/uploadFile",
  async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cloudinary/uploadFile`,
        data
      );
      return res?.data;
    } catch (error) {
      return "Audio upload failed: " + error.message;
    }
  }
);

// Async thunk for deleting a culture entry
export const deleteCulture = createAsyncThunk(
  "cultures/deleteCulture",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      return id; // Return the id to identify which culture entry was deleted
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Culture entry deletion failed: " + error.message
      );
    }
  }
);
const initialState = {
  cultures: [],
  currentCulture: null,
  isLoading: false,
  error: null,
  isSuccess: false,
};

const cultureSlice = createSlice({
  name: "culture",
  initialState,
  reducers: {
    setCultures: (state, action) => {
      state.cultures = action.payload;
    },
    setCurrentCulture: (state, action) => {
      state.currentCulture = action.payload;
    },
    resetCultureStatus: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Culture
      .addCase(createCultureByAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(createCultureByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cultures.push(action.payload.data);
        state.currentCulture = action.payload.data;
      })
      .addCase(createCultureByAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSuccess = false;
      })
      .addCase(createCultureByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(createCultureByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cultures.push(action.payload.data);
        state.currentCulture = action.payload.data;
      })
      .addCase(createCultureByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSuccess = false;
      })
      .addCase(getCultures.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCultures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cultures = action.payload.data || [];
      })
      .addCase(getCultures.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCultureById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentCulture = null;
      })
      .addCase(getCultureById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCulture = action.payload.data;
      })
      .addCase(getCultureById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateCulture.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(updateCulture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.cultures.findIndex(
          (c) => c._id === action.payload.data._id
        );
        if (index !== -1) {
          state.cultures[index] = action.payload.data;
        }
        if (state.currentCulture?._id === action.payload.data._id) {
          state.currentCulture = action.payload.data;
        }
      })
      .addCase(updateCulture.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSuccess = false;
      })
      .addCase(deleteCulture.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(deleteCulture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cultures = state.cultures.filter(
          (culture) => culture._id !== action.payload // action.payload is the id
        );
        if (state.currentCulture?._id === action.payload) {
          state.currentCulture = null;
        }
      })
      .addCase(deleteCulture.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { setCultures, setCurrentCulture, resetCultureStatus } =
  cultureSlice.actions;
export default cultureSlice.reducer;
