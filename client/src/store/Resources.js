import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for creating a new resource
export const generateResource = createAsyncThunk(
  "resources/createResource",
  async ({topic}) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/resources/resource/generate`, 
        {topic}    
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Resource creation failed: " + error.message
      );
    }
  }
);

// Async thunk for fetching all resources
export const getResources = createAsyncThunk(
  "resources/getResources",
  async (_, thunkAPI) => { 
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/resources/resource/get`); // Assuming this endpoint for fetching resources
      return res?.data;
    } catch (error) {
      // It's good practice to reject with value for error handling in reducers
      return thunkAPI.rejectWithValue(
        "Failed to fetch resources: " + error.message
      );
    }
  }
);

// Async thunk for updating a resource
export const updateResource = createAsyncThunk(
  "resources/updateResource",
  async ({ id, resourceData }, thunkAPI) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/resources/${id}`,
        resourceData
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Resource update failed: " + error.message
      );
    }
  }
);

// Async thunk for deleting a resource
export const deleteResource = createAsyncThunk(
  "resources/deleteResource",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/resources/${id}`);
      return id; // Return the id to identify which resource was deleted
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Resource deletion failed: " + error.message
      );
    }
  }
);


const initialState = {
  resources: [],
  isLoading: false,
  error: null,
};

const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {
    
    setResources: (state, action) => {
      state.resources = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Resource
      .addCase(generateResource.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateResource.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resources.push(action.payload.data || action.payload);
      })
      .addCase(generateResource.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Resources
      .addCase(getResources.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getResources.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resources = action.payload.data || action.payload;
      })
      .addCase(getResources.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Resource
      .addCase(updateResource.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateResource.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedResource = action.payload.data || action.payload;
        const index = state.resources.findIndex(res => res._id === updatedResource._id); // Assuming resources have _id
        if (index !== -1) {
          state.resources[index] = updatedResource;
        }
      })
      .addCase(updateResource.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Resource
      .addCase(deleteResource.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteResource.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resources = state.resources.filter(
          (resource) => resource._id !== action.payload // action.payload is the id
        );
      })
      .addCase(deleteResource.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});


export default resourceSlice.reducer;