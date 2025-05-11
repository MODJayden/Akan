const Phrases = require("../Model/Phrases");

const createPhrases = async (req, res) => {
  try {
    const { phrase, meaning, audioUrl } = req.body;

    if (!phrase || !meaning || !audioUrl) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    const newPhrases = await Phrases.create({
      phrase,
      meaning,

      audioUrl,
    });
    res.status(201).json({
      message: "Phrases created successfully",
      data: newPhrases,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating alphabet", error: error.message });
  }
};

const getAllPhrasess = async (req, res) => {
  try {
    const phrases = await Phrases.find();
    res
      .status(200)
      .json({
        message: "Phrasess retrieved successfully",
        data: phrases,
        success: true,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving Phrasess", error: error.message });
  }
};
const deletePhrases = async (req, res) => {
  try {
    const { id } = req.params;
    const Phrases = await Phrases.findByIdAndDelete(id);
    res
      .status(200)
      .json({
        message: "Phrases deleted successfully",
        data: Phrases,
        success: true,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Phrases", error: error.message });
  }
};


module.exports = {
  createPhrases,
  getAllPhrasess,
  deletePhrases,
};