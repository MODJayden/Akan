import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create a new history entry by admin
export const createHistoryByAdmin = createAsyncThunk(
  "history/createHistoryByAdmin",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/history/createHistoryByAdmin`,
        formData
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to create history entry by admin: " + error.message
      );
    }
  }
);

// Async thunk to get all history entries
export const getHistoryEntries = createAsyncThunk(
  "history/getHistory",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/history/get/History`
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to fetch history entries: " + error.message
      );
    }
  }
);

// Async thunk to create a new history entry by user
export const createHistoryByUser = createAsyncThunk(
  "history/createHistoryByUser",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/history/createHistoryByUser`,
        formData
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to create history entry by user: " + error.message
      );
    }
  }
);

// Async thunk to update the status of a history entry
export const updateHistoryStatus = createAsyncThunk(
  "history/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/history/updateStatus/${id}`,
        { status }
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to update history status: " + error.message
      );
    }
  }
);

export const deleteHistoryEntry = createAsyncThunk(
  "history/deleteHistory",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/history/deleteHistoryEntry/${id}`
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to delete history entry: " + error.message
      );
    }
  }
);

const initialState = {
  histories: [],
  isLoading: false,
  error: null,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setEntries: (state, action) => {
      state.entries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create History By Admin
      .addCase(createHistoryByAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createHistoryByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.histories.push(action.payload.data);
      })
      .addCase(createHistoryByAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get History Entries
      .addCase(getHistoryEntries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHistoryEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.histories = action.payload.data; // Assuming API returns { data: [...] }
      })
      .addCase(getHistoryEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create History By User
      .addCase(createHistoryByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createHistoryByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.histories.push(action.payload.data);
      })
      .addCase(createHistoryByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateHistoryStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateHistoryStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        // Assuming the API returns the updated entry
        // Find and update the entry in the state
        // const index = state.entries.findIndex(
        //   (entry) => entry._id === action.payload.data._id // Adjust based on your entry's ID field
        // );
        // if (index !== -1) {
        //   state.entries[index] = action.payload.data;
        // }
      })
      .addCase(updateHistoryStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteHistoryEntry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteHistoryEntry.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteHistoryEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setEntries } = historySlice.actions;

export default historySlice.reducer;
