
const History = require('../Model/History');

const createHistoryByAdmin = async (req, res) => {
  try {

    const { title, description, type, format, file,status } = req.body;

    if (!title || !description || !type || !format || !file) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const history = new History({
      title,
      description,
      type,
      format,
      file,
      status:"Approved",
    });
    await history.save();
    res.status(201).json({
        message: 'History created successfully',
        data: history,
        success: true,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating history', error });
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await History.find();

    if (!history) {
      return res.status(404).json({ message: 'No history found' });
    }

    res.status(200).json({
      message: 'History retrieved successfully',
      data: history,
      success: true,
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving history', error });
  }
};

const createHistoryByUser = async (req, res) => {
  try {
    const { title, description, type, format, file } = req.body;

    if (!title || !description || !type || !format || !file) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const history = new History({
      title,
      description,
      type,
      format,
      file,
      status:"Pending",
    });
    await history.save();
    res.status(201).json({
        message: 'History created successfully',
        data: history,
        success: true,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating history', error });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Prevent twi field duplication
    if (updateData.twi) {
      const existing = await History.findOne({
        twi: updateData.twi,
        _id: { $ne: id },
      });
      

      if (existing) {
        return res.status(400).json({
          success: false,
          message: "This Twi word already exists in dictionary",
        });
      }
    }
    const entry = await History.findById(id);

    entry.status = "Approved";
    await entry.save();


    res.json({
      success: true,
      data: entry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update entry",
      error: error.message,
    });
  }
};

const deleteHistoryEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await History.findByIdAndDelete(id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",

      });
    }

    res.json({
      success: true,
      data: entry,

    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete entry",
      error: error.message,
    });
  }
};
module.exports = {
  createHistoryByAdmin,
  getHistory,
  createHistoryByUser,
  updateStatus,
  deleteHistoryEntry,
};