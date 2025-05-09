import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const generateFillIn = createAsyncThunk(
  "exercise/generateFillIn",
  async ({level}) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/api/exercise/createFillInTheBlank",
        {level}
      );
      return response?.data;
    } catch (error) {
      console.error("Error generating fill in exercise:", error);
      return { error: error.response.data.error };
    }
  }
);

export const getFillIns = createAsyncThunk("exercise/getFillIns", async () => {
  try {
    const response = await axios.get("http://localhost:5500/api/exercise/getFillInTheBlank");
    return response?.data;
  } catch (error) {
    console.error("Error fetching fill in exercises:", error);
    return { error: error.response.data.error };
  }
});
const fillInSlice = createSlice({
  name: "fillIn",
  initialState: {
    fillins: [],
    isLoading: false,
  },
  reducers: {
    setExercises: (state, action) => {
      state.exercises = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateFillIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateFillIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fillins = action.payload.data;
      })
      .addCase(generateFillIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getFillIns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFillIns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fillins = action.payload.data;
      })
      .addCase(getFillIns.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }); // Exporting actions
  },
});

export default fillInSlice.reducer;
