const fs = require("fs").promises;
const Mustache = require("mustache");
const axios = require("axios");

const createAppError = require("../utils/createAppError");

const loadTemplate = async (path) => {
  try {
    return await fs.readFile(path, "utf8");
  } catch (err) {
    throw createAppError(
      "Nepodařilo se načíst šablonu. Ujistěte se, že soubor existuje.",
      500
    );
  }
};

const fetchJoke = async () => {
  try {
    const response = await axios.get("https://api.chucknorris.io/jokes/random");
    return response.data.value;
  } catch (err) {
    throw createAppError(
      "Nepodařilo se načíst vtip z API. Zkuste to znovu.",
      500
    );
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const template = await loadTemplate("./views/dashboard.mustache");
    const jokeOfTheDay = await fetchJoke();
    const rendered = Mustache.render(template, { jokeOfTheDay });
    res.send(rendered);
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboard };
