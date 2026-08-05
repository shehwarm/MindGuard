const FocusSession = require("../models/FocusSession");

const getCurrentStreak = async (req, res) => {
  try {
    const sessions = await FocusSession.find({
      user: req.user.id,
      completed: true,
    }).sort({ createdAt: -1 });

    if (!sessions.length) {
      return res.json({
        success: true,
        streak: 0,
      });
    }

    const uniqueDays = [];

    sessions.forEach((session) => {
      const day = session.createdAt.toISOString().split("T")[0];

      if (!uniqueDays.includes(day)) {
        uniqueDays.push(day);
      }
    });

    let streak = 0;

    const today = new Date();

    for (let i = 0; i < uniqueDays.length; i++) {
      const expected = new Date(today);
      expected.setDate(today.getDate() - i);

      const expectedDay = expected.toISOString().split("T")[0];

      if (uniqueDays.includes(expectedDay)) {
        streak++;
      } else {
        break;
      }
    }

    res.json({
      success: true,
      streak,
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
  getCurrentStreak,
};