const mongoose = require("mongoose");
const { Schema } = mongoose;

const DiscussionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: String,
        enum: [
          "language",
          "pronunciation",
          "events",
          "culture",
          "history",
          "traditions",
        ],
        lowercase: true,
      },
    ],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Discussion = mongoose.model("Discussion", DiscussionSchema);
module.exports = Discussion;
