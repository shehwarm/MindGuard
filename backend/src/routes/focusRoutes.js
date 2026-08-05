const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
  startSession,
  completeSession,
  getTodaySessions,
  getHistory,
} = require("../controllers/focusController");

router.post("/start", protect, startSession);

router.post("/complete/:id", protect, completeSession);

router.get("/today", protect, getTodaySessions);

router.get("/history", protect, getHistory);

module.exports = router;