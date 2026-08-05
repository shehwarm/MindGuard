const FocusSession = require("../models/FocusSession");

const getDashboardStats = async (req, res) => {
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

    const completedSessions = sessions.filter(
      (session) => session.completed
    );

    const totalMinutes = completedSessions.reduce(
      (sum, session) => sum + session.duration,
      0
    );

    res.status(200).json({
      success: true,
      stats: {
        totalSessions: sessions.length,
        completedSessions: completedSessions.length,
        totalMinutes,
      },
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
  getDashboardStats,
};