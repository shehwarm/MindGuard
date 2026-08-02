const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
  createSession,
} = require("../controllers/focusController");

router.post("/", protect, createSession);

module.exports = router;