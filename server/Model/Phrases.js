const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhrasesSchema = new Schema({
  phrase: {
    type: String,
    required: true,
  },
  meaning: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
});

const Phrases = mongoose.model("Phrases", PhrasesSchema);

module.exports = Phrases;