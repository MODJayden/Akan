const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
  description: String,
  content: { type: String, required: true },
  exercises: [
    {
      question: String,
      options: [String],
      correctAnswer: Number,
    },
  ],
  order: Number,
  createdAt: { type: Date, default: Date.now },
});

const Lesson = mongoose.model("Lesson", LessonSchema);

module.exports = Lesson;
