const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SentenceConstructionSchema = new Schema({
 
  level: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
  sentenceTemplates: [
    {
      question: String,
      correctSentence: String,
    },
  ],
 
});
const Sentence = mongoose.model("Sentence", SentenceConstructionSchema);

const VocabularyMatchingSchema = new Schema({
  level: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
 
  vocabs: [
    {
      question: String,
      options: [String],
      correctAnswer: Number,
    },
  ],

 
});
const Vocabulary = mongoose.model(
  "VocabularyMatching",
  VocabularyMatchingSchema
);

const FillInTheBlankSchema = new Schema({
 
  level: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },

  sentenceTemplates: [
    { question: String, options: [String], correctAnswer: Number },
  ],

});

const FillInTheBlank = mongoose.model("FillInTheBlank", FillInTheBlankSchema);

module.exports = { Vocabulary, Sentence, FillInTheBlank };
