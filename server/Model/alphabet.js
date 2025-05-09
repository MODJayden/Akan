const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alphabetSchema = new mongoose.Schema(
  {
    letter: { type: String, required: true },
    sound: { type: String, required: true },
    example: { type: String, required: true },
    audioUrl: { type: String }, // Store URL to audio file
  },
  { timestamps: true }
);

const Alphabet = mongoose.model("Alphabet", alphabetSchema);

module.exports = Alphabet;
