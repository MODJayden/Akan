const Event = require("../Model/Event");

const createEvent = async (req, res) => {
  try {
    const {
      title,
      date,
      time,
      location,
      organizer,
      attendees,
      tags,
      description,
    } = req.body;
    if (
      !title ||
      !date ||
      !time ||
      !location ||
      !organizer ||
      !attendees ||
      !tags ||
      !description
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newEvent = new Event({
      title,
      date,
      time,
      location,
      organizer,
      attendees,
      tags,
      description,
    });
    await newEvent.save();
    res.status(201).json({
      message: "Event created successfully",
      data: newEvent,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      message: "Events retrieved successfully",
      data: events,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const id = req.params;
    if (!id) {
      return res.status(400).json({
        message: "No  id provided",
        success: false,
      });
    }
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({
      message: "Event fetched successfully",
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res
      .status(200)
      .json({ message: "Event deleted", data: event, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
