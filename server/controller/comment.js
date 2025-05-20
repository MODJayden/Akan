const Comment = require("../Model/comment");
const Discussion = require("../Model/community");

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { content, author, discussionId } = req.body;

    if (!content || !author || !discussionId) {
      return res.status(400).json({
        message: "Missing required fields: content and user are required.",
      });
    }
    const discussion = await Discussion.findById(discussionId);

    if (!discussion) {
      return res
        .status(404)
        .json({ message: "Discussion not found", success: false });
    }
    const comment = await Comment.create({
      content,
      author,
      discussionId,
    });

    const commentId = comment._id.toString();
    const commentedDiscussion = await Discussion.findByIdAndUpdate(
      discussionId,
      { $push: { comments: commentId } },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      message: "Comment created successfully",
      data: commentedDiscussion,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating comment", error: error.message });
  }
};

// Get all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("author")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Comments retrieved successfully",
      data: comments,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving comments",
      error: error.message,
    });
  }
};

// Get a single comment by ID
const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res
        .status(404)
        .json({ message: "Comment not found", success: false });
    }
    res.status(200).json({
      message: "Comment retrieved successfully",
      data: comment,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving comment",
      error: error.message,
    });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content cannot be empty." });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content },
      { new: true, runValidators: true }
    );

    if (!updatedComment) {
      return res
        .status(404)
        .json({ message: "Comment not found", success: false });
    }

    res.status(200).json({
      message: "Comment updated successfully",
      data: updatedComment,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating comment", error: error.message });
  }
};

// Delete a comment by ID
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res
        .status(404)
        .json({ message: "Comment not found", success: false });
    }
    res.status(200).json({
      message: "Comment deleted successfully",
      data: deletedComment,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
