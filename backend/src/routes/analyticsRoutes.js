const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
  getWeeklyAnalytics,
} = require("../controllers/analyticsController");

router.get("/weekly", protect, getWeeklyAnalytics);

module.exports = router;