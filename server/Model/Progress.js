const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const progressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lessonId: {
    type: Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },

  progress: {
    type: Number,
    default: 0,
  },
});

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;
