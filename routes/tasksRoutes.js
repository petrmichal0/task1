const express = require("express");
const { validateTask } = require("../validators/tasksValidator");
const {
  getAllTasks,
  getTaskById,
  getCreateTaskPage,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");

const router = express.Router();

router
  .route("/")
  .get(getAllTasks);

router
  .route("/create")
  .get(getCreateTaskPage)
  .post(validateTask, createTask);

router
  .route("/:id")
  .get(getTaskById)
  .patch(validateTask, updateTask)
  .delete(deleteTask);

module.exports = router;
