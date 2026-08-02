const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
    createHabit,
    getHabits,
    updateHabit
} = require("../controllers/habitController");

router.post("/", protect, createHabit);
router.get("/", protect, getHabits);
router.put("/:id", protect, updateHabit);


module.exports = router;