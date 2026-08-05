const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
  getCurrentStreak,
} = require("../controllers/streakController");

router.get("/", protect, getCurrentStreak);

module.exports = router;