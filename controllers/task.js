const Task = require("../models/task");
const { ErrorHandler } = require("../middlewares/error");

const handleNewTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task Added Successfully",
    });
  } catch (error) {
    next(err);
  }
};

const handleGetMyTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateMyTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("Task Not Found", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteMyTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("Task Not Found", 404));

    await task.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleNewTask,
  handleGetMyTask,
  handleUpdateMyTask,
  handleDeleteMyTask,
};
