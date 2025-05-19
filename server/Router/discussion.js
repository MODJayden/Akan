const express = require("express");
const router = express.Router();
const {
  createDiscussion,
  getAllDiscussions,
  getDiscussionById,
  updateDiscussion,
  deleteDiscussion,
} = require("../controller/discussion");

// Create a new discussion
router.post("/create", createDiscussion);

// Get all discussions
router.get("/getAll", getAllDiscussions);

// Get a single discussion by ID
router.get("/get/:id", getDiscussionById);

// Update a discussion
router.put("/update/:id", updateDiscussion);

// Delete a discussion by ID
router.delete("/delete/:id", deleteDiscussion);

module.exports = router;
