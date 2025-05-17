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
  },
});

export default store;
