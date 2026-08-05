const Note = require("../models/Note");

// Get Notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Note
const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      user: req.user.id,
      title: req.body.title,
      content: req.body.content,
    });

    res.status(201).json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    res.json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
const deleteNote = async (req, res) => {
  try {
    await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};