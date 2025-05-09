import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const generateVocabs = createAsyncThunk(
  "exercise/generateVocabs",
  async ({ level }) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/api/exercise/createVocabs",
        { level }
      );
      return response?.data;
    } catch (error) {
      console.error("Error generating vocabulary exercise:", error);
      return { error: error.response.data.error };
    }
  }
);

export const getVocabs = createAsyncThunk("exercise/getVocabs", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5500/api/exercise/getVocabs"
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching vocabulary exercises:", error);
    return { error: error.response.data.error };
  }
});

const vocabsSlice = createSlice({
  name: "exercise",
  initialState: {
    vocabs: [],
    isLoading: false,
  },
  reducers: {
    setExercises: (state, action) => {
      state.exercises = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateVocabs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateVocabs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vocabs = action.payload.data;
      })
      .addCase(generateVocabs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getVocabs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVocabs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vocabs = action.payload.data;
      })
      .addCase(getVocabs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Exporting actions
export default vocabsSlice.reducer;
