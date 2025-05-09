import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import lessonReducer from "./Lesson";
import resourceReducer from "./Resources"; // Added resource reducer
import vocabsReducer from "./Exercise"; // Added exercise reducer
import sentenceReducer from "./Sentence";
import fillInReducer from "./Fillin";

const store = configureStore({
  reducer: {
    auth: authReducer,
    lesson: lessonReducer,
    resource: resourceReducer, // Added resource reducer
    vocabs: vocabsReducer,
    sentence: sentenceReducer,
    fillIn: fillInReducer,
    // Added exercise reducer
  },
});

export default store;
