const mongoose = require("mongoose");

const NormalDictionarySchema = new mongoose.Schema({
  twi: String,
  english: String,
  definition: String,
  partOfSpeech: {
    type: String,
    enum: [
      "interjection",
      "noun",
      "verb",
      "adjective",
      "adverb",
      "pronoun",
      "preposition",
      "conjunction",
      "determiner",
      "numeral",
      "phrase",
      "idiom",
    ],
    default: "noun",
  },
  examples: [
    {
      twi: String,
      english: String,
    },
  ],

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const NormalDictionary = mongoose.model(
  "NormalDictionary",
  NormalDictionarySchema
);

module.exports = NormalDictionary;
