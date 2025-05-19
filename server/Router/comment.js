const express = require("express");
const router = express.Router();
const { createComment, getAllComments, getCommentById, updateComment, deleteComment } = require("../controller/comment");

// Create a new comment
router.post("/create", createComment);

// Get all comments
router.get("/getAll", getAllComments);

// Get a single comment by ID
router.get("/comment/:id", getCommentById);

// Update a comment
router.put("/update/:id", updateComment);

// Delete a comment by ID
router.delete("/delete/:id", deleteComment);

module.exports = router;