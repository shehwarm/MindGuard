const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
  createHabit,
} = require("../controllers/habitController");

router.post("/", protect, createHabit);

module.exports = router;