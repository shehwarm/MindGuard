const FocusSession = require("../models/FocusSession");

const getWeeklyAnalytics = async (req, res) => {
  try {
    const today = new Date();

    const analytics = [];

    for (let i = 6; i >= 0; i--) {
      const start = new Date(today);
      start.setDate(today.getDate() - i);
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      end.setHours(23, 59, 59, 999);

      const sessions = await FocusSession.find({
        user: req.user.id,
        completed: true,
        createdAt: {
          $gte: start,
          $lte: end,
        },
      });

      const minutes = sessions.reduce(
        (sum, session) => sum + session.duration,
        0
      );

      analytics.push({
        day: start.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        minutes,
      });
    }

    res.status(200).json({
      success: true,
      analytics,
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
  getWeeklyAnalytics,
};