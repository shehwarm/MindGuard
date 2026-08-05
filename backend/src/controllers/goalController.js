const Goal = require("../models/Goal");

// Create Goal
const createGoal = async (req, res) => {
  try {
    const goal = await Goal.create({
      user: req.user.id,
      title: req.body.title,
    });

    res.status(201).json({
      success: true,
      goal,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Goals
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      goals,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Complete Goal
const completeGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    goal.completed = true;

    await goal.save();

    res.json({
      success: true,
      goal,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Goal
const deleteGoal = async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Goal deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createGoal,
  getGoals,
  completeGoal,
  deleteGoal,
};