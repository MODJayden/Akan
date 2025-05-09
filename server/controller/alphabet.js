const Alphabet = require("../Model/alphabet");

const createAlphabet = async (req, res) => {
  try {
    const { alphabet, sound, example, audioUrl } = req.body;
    if (!alphabet || !sound || !example || !audioUrl) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    const newAlphabet = await Alphabet.create({
      alphabet,
      sound,
      example,
      audioUrl,
    });
    res
      .status(201)
      .json({ message: "Alphabet created successfully", data: newAlphabet });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating alphabet", error: error.message });
  }
};

const getAllAlphabets = async (req, res) => {
  try {
    const alphabets = await Alphabet.find();
    res
      .status(200)
      .json({ message: "Alphabets retrieved successfully", data: alphabets });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving alphabets", error: error.message });
  }
};
const deleteAlphabet = async (req, res) => {
  try {
    const { id } = req.params;
    const alphabet = await Alphabet.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Alphabet deleted successfully", data: alphabet });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting alphabet", error: error.message });
  }
};

module.exports = {
  createAlphabet,
  getAllAlphabets,
  deleteAlphabet,
};
