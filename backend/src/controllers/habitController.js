const Habit = require("../models/Habit");

const createHabit = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required.",
      });
    }

    const habit = await Habit.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Habit created successfully.",
      habit,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createHabit,
};