const FocusSession = require("../models/FocusSession");

// Start a new focus session
const startSession = async (req, res) => {
  try {
    const { duration } = req.body;

    const session = await FocusSession.create({
      user: req.user.id,
      duration: duration || 25,
      completed: false,
    });

    res.status(201).json({
      success: true,
      message: "Focus session started.",
      session,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Complete session
const completeSession = async (req, res) => {
  try {
    const session = await FocusSession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found.",
      });
    }

    session.completed = true;
    session.completedAt = new Date();

    await session.save();

    res.status(200).json({
      success: true,
      message: "Session completed.",
      session,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Today's sessions
const getTodaySessions = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const sessions = await FocusSession.find({
      user: req.user.id,
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });

    res.status(200).json({
      success: true,
      count: sessions.length,
      sessions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// History
const getHistory = async (req, res) => {
  try {
    const sessions = await FocusSession.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      sessions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  startSession,
  completeSession,
  getTodaySessions,
  getHistory,
};