const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resourcesSchema = new Schema(
  {
    title: String,
    type: String,
    content: String,
  },
  { timestamps: true }
);

const Resources = mongoose.model("Resources", resourcesSchema);

module.exports = Resources;
