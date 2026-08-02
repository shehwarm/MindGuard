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

const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: habits.length,
      habits,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found."
      });
    }

    // Check ownership
    if (habit.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied."
      });
    }

    const updatedHabit = await Habit.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Habit updated successfully.",
      habit: updatedHabit,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found.",
      });
    }

    // Check ownership
    if (habit.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    await Habit.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Habit deleted successfully.",
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
  getHabits,
  updateHabit,
  deleteHabit,
};
