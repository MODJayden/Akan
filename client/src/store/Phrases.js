import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for creating a new phrase
export const createPhrase = createAsyncThunk(
  "phrases/createPhrase",
  async (form) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/phrases/create`,
        form
      );
      return res?.data;
    } catch (error) {
      return "Phrase creation failed: " + error.message;
    }
  }
);

// Async thunk for fetching all phrases
export const getPhrases = createAsyncThunk(
  "phrases/getPhrases",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/phrases/all`
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to fetch phrases: " + error.message
      );
    }
  }
);

export const uploadAudioPhrase = createAsyncThunk(
  "phrases/uploadAudioPhrase",
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
export const deletePhrase = createAsyncThunk(
  "phrases/deletePhrase",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/phrases/delete/${id}`
      );
      return id; // Return the id to identify which phrase was deleted
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Phrase deletion failed: " + error.message
      );
    }
  }
);

const initialState = {
  phrases: [],
  isLoading: false,
  error: null,
};

const phraseSlice = createSlice({
  name: "phrase",
  initialState,
  reducers: {
    setPhrases: (state, action) => {
      state.phrases = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Phrase
      .addCase(createPhrase.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPhrase.fulfilled, (state, action) => {
        state.isLoading = false;
        // The controller returns { message: "...", data: newPhrase }
        state.phrases.push(action.payload.data || action.payload);
      })
      .addCase(createPhrase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Phrases
      .addCase(getPhrases.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPhrases.fulfilled, (state, action) => {
        state.isLoading = false;
        // The controller returns { message: "...", data: phrases }
        state.phrases = action.payload.data || action.payload;
      })
      .addCase(getPhrases.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Phrase
      .addCase(deletePhrase.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePhrase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.phrases = state.phrases.filter(
          (phrase) => phrase._id !== action.payload // action.payload is the id
        );
      })
      .addCase(deletePhrase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setPhrases } = phraseSlice.actions;
export default phraseSlice.reducer;