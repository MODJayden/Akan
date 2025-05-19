import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/discussions`;

// Async thunk for creating a new discussion
export const createDiscussion = createAsyncThunk(
  "discussions/createDiscussion",
  async (discussionData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/create`,
        discussionData
      );
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Error creating discussion: " + error.message
      );
    }
  }
);

// Async thunk for fetching all discussions
export const fetchDiscussions = createAsyncThunk(
  "discussions/fetchDiscussions",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAll`);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Error fetching discussions: " + error.message
      );
    }
  }
);

// Async thunk for fetching a single discussion by ID
export const getDiscussionById = createAsyncThunk(
  "discussions/getDiscussionById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/${id}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Error fetching discussion: " + error.message
      );
    }
  }
);

// Async thunk for updating a discussion
export const updateDiscussion = createAsyncThunk(
  "discussions/updateDiscussion",
  async ({ id, title, content }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update/${id}`, {
        title,
        content,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Error updating discussion: " + error.message
      );
    }
  }
);

// Async thunk for deleting a discussion
export const deleteDiscussion = createAsyncThunk(
  "discussions/deleteDiscussion",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Error deleting discussion: " + error.message
      );
    }
  }
);

const initialState = {
  discussions: [],
  currentDiscussion: null,
  isLoading: false,
  error: null,
  isSuccess: false,
};

const discussionSlice = createSlice({
  name: "discussions",
  initialState,
  reducers: {
    setDiscussions: (state, action) => {
      state.discussions = action.payload;
    },
    setCurrentDiscussion: (state, action) => {
      state.currentDiscussion = action.payload;
    },
    resetDiscussionStatus: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDiscussion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(createDiscussion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.discussions.push(action.payload.data);
        state.currentDiscussion = action.payload.data;
      })
      .addCase(createDiscussion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSuccess = false;
      })
      .addCase(fetchDiscussions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDiscussions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discussions = action.payload.data || [];
      })
      .addCase(fetchDiscussions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getDiscussionById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentDiscussion = null;
      })
      .addCase(getDiscussionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDiscussion = action.payload.data;
      })
      .addCase(getDiscussionById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateDiscussion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(updateDiscussion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.discussions = action.payload.data;
      })
      .addCase(updateDiscussion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSuccess = false;
      })
      .addCase(deleteDiscussion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(deleteDiscussion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.discussions = action.payload.data;
      })
      .addCase(deleteDiscussion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { setDiscussions, setCurrentDiscussion, resetDiscussionStatus } =
  discussionSlice.actions;
export default discussionSlice.reducer;
