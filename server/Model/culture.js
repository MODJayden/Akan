const mongoose = require("mongoose");
const { Schema } = mongoose;

const cultureSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Traditions & Customs",
        "History & Heritage",
        "Arts & Crafts",
        "Music & Dance",
        "Social Customs & Etiquette",
        "Folklore & Oral Traditions",
      ],
    },

    description: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
    },
    fileType: {
      type: String,
      enum: ["image", "video", "audio", "gallery"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);
// Create the model
const Culture = mongoose.model("Culture", cultureSchema);

module.exports = Culture;
