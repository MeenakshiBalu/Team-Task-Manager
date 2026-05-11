const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// CREATE TASK

router.post("/create", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, description, priority, dueDate, assignedTo, project } = req.body;

    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      project
    });

    await task.save();

    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL TASKS
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;