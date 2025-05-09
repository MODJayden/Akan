import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const generateSentence = createAsyncThunk(
  "exercise/generateSentences",
  async ({level}) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/exercise/createSentence`,
        {level}
      );
      return response?.data;
    } catch (error) {
      console.error("Error generating sentence exercise:", error);
      return { error: error.response.data.error };
    }
  }
);

export const getSentences = createAsyncThunk(
  "exercise/getSentences",
  async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/exercise/getSentences`);
      return response?.data;
    } catch (error) {
      console.error("Error fetching sentence exercises:", error);
      return { error: error.response.data.error };
    }
  }
);

const sentenceSlice = createSlice({
  name: "sentence",
  initialState: {
    sentences: [],
    isLoading: false,
  },
  reducers: {
    setExercises: (state, action) => {
      state.exercises = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateSentence.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateSentence.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sentences = action.payload.data;
      })
      .addCase(generateSentence.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getSentences.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSentences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sentences = action.payload.data;
      })
      .addCase(getSentences.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
 
export default sentenceSlice.reducer;