import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import lessonReducer from "./Lesson";
import resourceReducer from "./Resources";
import vocabsReducer from "./Exercise"; 
import sentenceReducer from "./Sentence";
import fillInReducer from "./Fillin";
import alphabetReducer from "./Alphabet"; 
import phraseReducer from "./Phrases"; 
import cultureReducer from "./Culture"; 
import dictionaryReducer from "./Dictionary";
import historyReducer from "./History";
import commentReducer from "./commentSlice";
import discussionReducer from "./discussionSlice";
import eventReducer from "./Event"; // ADDED

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
    dictionary: dictionaryReducer,
    history: historyReducer,
    comments: commentReducer,
    discussions: discussionReducer,
    event: eventReducer, // ADDED
  },
});

export default store;
