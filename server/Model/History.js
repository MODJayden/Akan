const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: {
    type: String,
    enum: [
      "Archival Documents",
      "Oral Histories",
      "Cultural Objects",
      "Photographs",
      "Other",
    ],
    required: true,
  },
  format: String,
  file: String,
  status: {
    type: String,

    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

const History = mongoose.model("History", resourceSchema);

module.exports = History;
