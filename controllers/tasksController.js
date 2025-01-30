const fs = require("fs").promises;
const Mustache = require("mustache");
const { format } = require("date-fns");

const { readTasks, writeTasks } = require("../utils/fileUtils");
const createAppError = require("../utils/createAppError");

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const template = await fs.readFile("./views/tasks.mustache", "utf8");
    const rendered = Mustache.render(template, { tasks });
    res.send(rendered);
  } catch (err) {
    next(createAppError("Nepodařilo se načíst úkoly nebo šablonu.", 500));
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find((task) => task.id === parseInt(req.params.id, 10));

    if (!task) {
      throw createAppError("Úkol nebyl nalezen.", 404);
    }

    task.isNew = task.status === "nový";
    task.isInProgress = task.status === "v řešení";
    task.isDone = task.status === "hotovo";

    const template = await fs.readFile("./views/taskDetails.mustache", "utf8");
    const rendered = Mustache.render(template, { task });
    res.send(rendered);
  } catch (err) {
    next(err);
  }
};

const getCreateTaskPage = async (req, res, next) => {
  try {
    const template = await fs.readFile("./views/createTask.mustache", "utf8");
    const rendered = Mustache.render(template);
    res.send(rendered);
  } catch (err) {
    next(
      createAppError("Nepodařilo se načíst stránku pro vytvoření úkolu.", 500)
    );
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;

    const status = "nový";
    const dueDate = format(new Date(), "yyyy-MM-dd");

    const tasks = await readTasks();
    const newTask = { id: Date.now(), title, status, dueDate };

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const taskId = parseInt(req.params.id, 10);

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...req.body } : task
    );

    const updatedTask = updatedTasks.find((task) => task.id === taskId);
    if (!updatedTask) {
      throw createAppError("Úkol nebyl nalezen.", 404);
    }

    await writeTasks(updatedTasks);
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const updatedTasks = tasks.filter(
      (task) => task.id !== parseInt(req.params.id, 10)
    );

    if (tasks.length === updatedTasks.length) {
      throw createAppError("Úkol nebyl nalezen.", 404);
    }

    await writeTasks(updatedTasks);
    res.status(200).json({ message: "Úkol byl smazán." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  getCreateTaskPage,
  createTask,
  updateTask,
  deleteTask,
};
