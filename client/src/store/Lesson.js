import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const generateLesson = createAsyncThunk(
  "/generate/lesson",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:5500/api/lessons/generate",
        formData
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Generation failed: " + error.message);
    }
  }
);

export const getLesson = createAsyncThunk("/get/lessons", async () => {
  try {
    const res = await axios.get("http://localhost:5500/api/lessons");

    return res?.data;
  } catch (error) {
    console.log(error, "something went wrong");
  }
});

const initialState = {
  lessons: [],
  isLoading: false,
  error: null,
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setLessons: (state, action) => {
      state.lessons = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateLesson.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(generateLesson.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lessons.push(action.payload);
    });
    builder.addCase(generateLesson.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getLesson.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLesson.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lessons = action.payload.data;
    });
    builder.addCase(getLesson.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setLessons } = lessonSlice.actions;

export default lessonSlice.reducer;
