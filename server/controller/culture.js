const Culture = require("../Model/culture");

// Create a new culture entry
const createCultureByAdmin = async (req, res) => {
  try {
    const { title, category, description, fileUrl, fileType, user } = req.body;

    if (!title || !category || !description || !user) {
      return res.status(400).json({
        message:
          "Missing required fields: title, category, and description are required.",
      });
    }

    const newCulture = await Culture.create({
      title,
      category,
      description,
      fileUrl,
      fileType,
      user,
      status: "approved",
    });
    res.status(201).json({
      message: "Culture entry created successfully",
      data: newCulture,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating culture entry", error: error.message });
  }
};
const createCultureByUser = async (req, res) => {
  try {
    const { title, category, description, fileUrl, fileType, user } = req.body;

    if (!title || !category || !description || !user) {
      return res.status(400).json({
        message:
          "Missing required fields: title, category, and description are required.",
      });
    }

    const newCulture = await Culture.create({
      title,
      category,
      description,
      fileUrl,
      fileType,
      user,
      status: "pending",
    });
    res.status(201).json({
      message: "Culture entry created successfully",
      data: newCulture,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating culture entry", error: error.message });
  }
};

// Get all culture entries
const getAllCultures = async (req, res) => {
  try {
    const cultures = await Culture.find()
      .populate("user")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Culture entries retrieved successfully",
      data: cultures,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving culture entries",
      error: error.message,
    });
  }
};

// Get a single culture entry by ID
const getCultureById = async (req, res) => {
  try {
    const { id } = req.params;
    const culture = await Culture.findById(id);
    if (!culture) {
      return res
        .status(404)
        .json({ message: "Culture entry not found", success: false });
    }
    res.status(200).json({
      message: "Culture entry retrieved successfully",
      data: culture,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving culture entry",
      error: error.message,
    });
  }
};

const updateCulture = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Basic validation for status
    if (!status) {
      return res.status(400).json({ message: "Status cannot be empty." });
    }

    const updatedCulture = await Culture.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedCulture) {
      return res
        .status(404)
        .json({ message: "Culture entry not found", success: false });
    }

    res.status(200).json({
      message: "Culture entry status updated successfully",
      data: updatedCulture,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating culture entry status",
        error: error.message,
      });
  }
};

// Delete a culture entry by ID
const deleteCulture = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCulture = await Culture.findByIdAndDelete(id);
    if (!deletedCulture) {
      return res
        .status(404)
        .json({ message: "Culture entry not found", success: false });
    }
    res.status(200).json({
      message: "Culture entry deleted successfully",
      data: deletedCulture,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting culture entry", error: error.message });
  }
};

module.exports = {
  createCultureByAdmin,
  createCultureByUser,
  getAllCultures,
  getCultureById,
  updateCulture,
  deleteCulture,
};
