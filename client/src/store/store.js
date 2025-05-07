import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import lessonReducer from "./Lesson";

const store = configureStore({
  reducer: {
    auth: authReducer,
    lesson: lessonReducer,
  },
});

export default store;
