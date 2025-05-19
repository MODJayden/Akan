const Community = require("../Model/community");

// Create a new discussion
const createDiscussion = async (req, res) => {
  try {
    const { title, content, author, tags, comments, likes } = req.body;

    if (!title || !content || !author || !tags) {
      return res.status(400).json({
        message:
          "Missing required fields: title, content, and author are required.",
      });
    }

    const newDiscussion = await Community.create({
      title,
      content,
      author,
      tags,
      comments,
      likes,
    });
    res.status(201).json({
      message: "Discussion created successfully",
      data: newDiscussion,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating discussion", error: error.message });
  }
};

// Get all discussions
const getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Community.find()
      .populate("author")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Discussions retrieved successfully",
      data: discussions,
      success: true,
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving discussions",
      error: error.message,
    });
  }
};

// Get a single discussion by ID
const getDiscussionById = async (req, res) => {
  try {
    const { id } = req.params;
    const discussion = await Community.findById(id);
    if (!discussion) {
      return res
        .status(404)
        .json({ message: "Discussion not found", success: false });
    }
    res.status(200).json({
      message: "Discussion retrieved successfully",
      data: discussion,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving discussion",
      error: error.message,
    });
  }
};

// Update a discussion
const updateDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content cannot be empty." });
    }

    const updatedDiscussion = await Community.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedDiscussion) {
      return res
        .status(404)
        .json({ message: "Discussion not found", success: false });
    }

    res.status(200).json({
      message: "Discussion updated successfully",
      data: updatedDiscussion,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating discussion", error: error.message });
  }
};

// Delete a discussion by ID
const deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDiscussion = await Community.findByIdAndDelete(id);
    if (!deletedDiscussion) {
      return res
        .status(404)
        .json({ message: "Discussion not found", success: false });
    }
    res.status(200).json({
      message: "Discussion deleted successfully",
      data: deletedDiscussion,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting discussion", error: error.message });
  }
};

module.exports = {
  createDiscussion,
  getAllDiscussions,
  getDiscussionById,
  updateDiscussion,
  deleteDiscussion,
};
