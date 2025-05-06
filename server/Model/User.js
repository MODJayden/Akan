const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  avatar: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  }
},{ timestamps: true });

module.exports = mongoose.model("User", userSchema);
