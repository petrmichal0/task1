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

router.get("/", getAllTasks);
router.get("/create", getCreateTaskPage);
router.post("/create", validateTask, createTask);
router.get("/:id", getTaskById);
router.patch("/:id", validateTask, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
