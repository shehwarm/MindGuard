const FocusSession = require("../models/FocusSession");

const createSession = async (req, res) => {
  try {
    const { duration, startedAt, endedAt } = req.body;

    if (!duration || !startedAt || !endedAt) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const session = await FocusSession.create({
      user: req.user.id,
      duration,
      startedAt,
      endedAt,
      completed: true,
    });

    res.status(201).json({
      success: true,
      message: "Focus session saved successfully.",
      session,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSession,
};