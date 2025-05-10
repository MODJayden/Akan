import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for creating a new alphabet
export const createAlphabet = createAsyncThunk(
  "alphabets/createAlphabet",
  async (form) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/alphabet/alphabet`,
        form
      );
      return res?.data;
    } catch (error) {
      return "Alphabet creation failed: " + error.message;
    }
  }
);

// Async thunk for fetching all alphabets
export const getAlphabets = createAsyncThunk(
  "alphabets/getAlphabets",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/alphabet/alphabet`
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to fetch alphabets: " + error.message
      );
    }
  }
);

export const uploadAudio = createAsyncThunk(
  "alphabets/uploadAudio",
  async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cloudinary/upload`,
        data
      );
      return res?.data;
    } catch (error) {
      return "Audio upload failed: " + error.message;
    }
  }
);
export const deleteAlphabet = createAsyncThunk(
  "alphabets/deleteAlphabet",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/alphabet/alphabet/${id}`
      );
      return id; // Return the id to identify which alphabet was deleted
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Alphabet deletion failed: " + error.message
      );
    }
  }
);

const initialState = {
  alphabets: [],
  isLoading: false,
  error: null,
};

const alphabetSlice = createSlice({
  name: "alphabet",
  initialState,
  reducers: {
    setAlphabets: (state, action) => {
      state.alphabets = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Alphabet
      .addCase(createAlphabet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAlphabet.fulfilled, (state, action) => {
        state.isLoading = false;
        // The controller returns { message: "...", data: newAlphabet }
        state.alphabets.push(action.payload.data || action.payload);
      })
      .addCase(createAlphabet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Alphabets
      .addCase(getAlphabets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAlphabets.fulfilled, (state, action) => {
        state.isLoading = false;
        // The controller returns { message: "...", data: alphabets }
        state.alphabets = action.payload.data || action.payload;
      })
      .addCase(getAlphabets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Alphabet (Placeholder, as not implemented in backend)
      // Delete Alphabet
      .addCase(deleteAlphabet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAlphabet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.alphabets = state.alphabets.filter(
          (alphabet) => alphabet._id !== action.payload // action.payload is the id
        );
      })
      .addCase(deleteAlphabet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setAlphabets } = alphabetSlice.actions;
export default alphabetSlice.reducer;
