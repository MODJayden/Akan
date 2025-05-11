import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import lessonReducer from "./Lesson";
import resourceReducer from "./Resources"; // Added resource reducer
import vocabsReducer from "./Exercise"; // Added exercise reducer
import sentenceReducer from "./Sentence";
import fillInReducer from "./Fillin";
import alphabetReducer from "./Alphabet"; // Added alphabet reducer
import phraseReducer from "./Phrases"; // Added phrase reducer
import cultureReducer from "./Culture"; // Added culture reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    lesson: lessonReducer,
    resource: resourceReducer, 
    vocabs: vocabsReducer,
    sentence: sentenceReducer,
    fillIn: fillInReducer,
    alphabet: alphabetReducer, 
    phrase: phraseReducer,  
    culture: cultureReducer,
  },
});

export default store;
