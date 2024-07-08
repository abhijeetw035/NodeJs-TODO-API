const express = require("express");
const {
  handleNewTask,
  handleGetMyTask,
  handleUpdateMyTask,
  handleDeleteMyTask,
} = require("../controllers/task");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/new", isAuthenticated, handleNewTask);
router.get("/my", isAuthenticated, handleGetMyTask);
router
  .route("/:id")
  .put(isAuthenticated, handleUpdateMyTask)
  .delete(isAuthenticated, handleDeleteMyTask);

module.exports = router;
