const fs = require("fs").promises;
const path = require("path");

const createAppError = require("../utils/createAppError");

const filePath = path.join(__dirname, "../data/tasks.json");

const readTasks = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Chyba při čtení souboru:", err.message);
    if (err.code === "ENOENT") {
      return [];
    }
    throw createAppError(
      `Nepodařilo se načíst úkoly ze souboru JSON. Zkuste to prosím znovu později. Chyba: ${err.message}`,
      500
    );
  }
};

const writeTasks = async (tasks) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
  } catch (err) {
    throw createAppError(
      `Nepodařilo se zapsat úkoly do souboru JSON: ${err.message}`,
      500
    );
  }
};

module.exports = { readTasks, writeTasks };
