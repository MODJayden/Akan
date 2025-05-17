import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to add a new dictionary entry
export const addDictionaryEntry = createAsyncThunk(
  "dictionary/addEntry",
  async (_, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/dictionary/populate`,
        
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to add dictionary entry: " + error.message
      );
    }
  }
);

export const createWordByAdmin = createAsyncThunk(
  "dictionary/createWordByAdmin",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/dictionary/create/admin`,
        formData
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to create dictionary entry: " + error.message
      );
    }
  }
);
export const createWordByUser = createAsyncThunk(
  "dictionary/createWordByUser",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/dictionary/create/user`,
        formData
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to create dictionary entry: " + error.message
      );
    }
  }
);    

// Async thunk to get all dictionary entries
export const getDictionaryEntries = createAsyncThunk(
  "dictionary/getEntries",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/dictionary/all`
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to fetch dictionary entries: " + error.message
      );
    }
  }
);

// Async thunk to update a dictionary entry
export const updateDictionaryEntry = createAsyncThunk(
  "dictionary/updateEntry",
  async ({ id, entryData }, thunkAPI) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/dictionary/update/${id}`,
        entryData
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to update dictionary entry: " + error.message
      );
    }
  }
);
export const deleteDictionaryEntry = createAsyncThunk(
  "dictionary/deleteEntry",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/dictionary/delete/${id}`
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to delete dictionary entry: " + error.message
      );
    }
  }
);  

const initialState = {
  entries: [],
  isLoading: false,
  error: null,
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    setEntries: (state, action) => {
      state.entries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Dictionary Entry
      .addCase(addDictionaryEntry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addDictionaryEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entries.push(action.payload.data);
      })
      .addCase(addDictionaryEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Dictionary Entries
      .addCase(getDictionaryEntries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDictionaryEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entries = action.payload.data; // Assuming API returns { data: [...] }
      })
      .addCase(getDictionaryEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Dictionary Entry
      .addCase(updateDictionaryEntry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDictionaryEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        // Assuming the API returns the updated entry
        // Find and update the entry in the state
        const index = state.entries.findIndex(
          (entry) => entry._id === action.payload.data._id // Adjust based on your entry's ID field
        );
        if (index !== -1) {
          state.entries[index] = action.payload.data;
        }
      })
      .addCase(updateDictionaryEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createWordByAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createWordByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entries.push(action.payload.data);
      })
      .addCase(createWordByAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createWordByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createWordByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entries.push(action.payload.data);
      })
      .addCase(createWordByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }); // Add reducers for other actions here
  },
});

export const { setEntries } = dictionarySlice.actions;

export default dictionarySlice.reducer;