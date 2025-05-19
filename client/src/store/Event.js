import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/events`;

// Async thunk for creating a new event
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/create`, eventData);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Event creation failed: " + error.message
      );
    }
  }
);

// Async thunk for fetching all events
export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/getAll`);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch events: " + error.message
      );
    }
  }
);

// Async thunk for fetching a single event by ID
export const getEventById = createAsyncThunk(
  "events/getEventById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/get/${id}`);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch event: " + error.message
      );
    }
  }
);

// Async thunk for updating an event
export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, eventData }, thunkAPI) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/update/${id}`, eventData);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Event update failed: " + error.message
      );
    }
  }
);

// Async thunk for deleting an event
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      return id; // Return the id to identify which event was deleted
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Event deletion failed: " + error.message
      );
    }
  }
);

const initialState = {
  events: [],
  currentEvent: null,
  isLoading: false,
  error: null,
  isSuccess: false,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
    },
    resetEventStatus: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Event
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events.push(action.payload.data);
        state.currentEvent = action.payload.data;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSuccess = false;
      })
      // Get Events
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload.data || [];
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Event By Id
      .addCase(getEventById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentEvent = null;
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentEvent = action.payload.data;
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Event
      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.events.findIndex(
          (e) => e._id === action.payload.data._id
        );
        if (index !== -1) {
          state.events[index] = action.payload.data;
        }
        if (state.currentEvent?._id === action.payload.data._id) {
          state.currentEvent = action.payload.data;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSuccess = false;
      })
      // Delete Event
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events = state.events.filter(
          (event) => event._id !== action.payload // action.payload is the id
        );
        if (state.currentEvent?._id === action.payload) {
          state.currentEvent = null;
        }
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { setEvents, setCurrentEvent, resetEventStatus } =
  eventSlice.actions;
export default eventSlice.reducer;