const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
  createGoal,
  getGoals,
  completeGoal,
  deleteGoal,
} = require("../controllers/goalController");

router.post("/", protect, createGoal);

router.get("/", protect, getGoals);

router.put("/:id", protect, completeGoal);

router.delete("/:id", protect, deleteGoal);

module.exports = router;