import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/comments`;

// Async thunk for creating a new comment
export const createComment = createAsyncThunk(
  "comments/createComment",
  async (commentData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, commentData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error creating comment: " + error.message
      );
    }
  }
);

// Async thunk for fetching all comments
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAll`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching comments: " + error.message
      );
    }
  }
);

// Async thunk for fetching a single comment by ID
export const getCommentById = createAsyncThunk(
  "comments/getCommentById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/${id}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching comment: " + error.message
      );
    }
  }
);

// Async thunk for updating a comment
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ id, content }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update/${id}`, { content });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error updating comment: " + error.message
      );
    }
  }
);

// Async thunk for deleting a comment
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error deleting comment: " + error.message
      );
    }
  }
);

const initialState = {
  comments: [],
  currentComment: null,
  isLoading: false,
  error: null,
  isSuccess: false,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setCurrentComment: (state, action) => {
      state.currentComment = action.payload;
    },
    resetCommentStatus: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments.push(action.payload.data);
        state.currentComment = action.payload.data;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSuccess = false;
      })
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload.data || [];
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCommentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentComment = null;
      })
      .addCase(getCommentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentComment = action.payload.data;
      })
      .addCase(getCommentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.comments.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
        if (state.currentComment?._id === action.payload._id) {
          state.currentComment = action.payload.data;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSuccess = false;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = action.payload.data})
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { setComments, setCurrentComment, resetCommentStatus } =
  commentSlice.actions;
export default commentSlice.reducer;