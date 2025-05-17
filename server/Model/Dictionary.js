const mongoose = require("mongoose");
const { Schema } = mongoose;

const dictionarySchema = new Schema(
  {
    twi: {
      type: String,
      required: true,
    },
    fante: {
      type: String,
    },
    english: {
      type: String,
      required: true,
    },
    pronunciation: {
      type: String,
    },
    etymology: {
      type: String,
    },
    partOfSpeech: {
      type: String,
      required: true,
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
        twi: { type: String, required: true },
        english: { type: String, required: true },
        dialect: { type: String },
      },
    ],
    related: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Dictionary = mongoose.model("Dictionary", dictionarySchema);

module.exports = Dictionary;
