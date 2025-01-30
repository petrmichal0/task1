const fs = require("fs").promises;
const Mustache = require("mustache");
const { addDays, format, parseISO } = require("date-fns");
const diff = require("fast-array-diff");

const createAppError = require("../utils/createAppError");

let lastCalculatedDate = new Date();
let history = [];

const getCurrentDate = async (req, res, next) => {
  try {
    if (req.query.reset === "true") {
      lastCalculatedDate = new Date();
      history = [];
    }

    const numberOfDays = parseInt(req.query.numberOfday, 10) || 0;

    let baseDate = lastCalculatedDate;
    if (history.length > 0 && req.query.reset !== "true") {
      baseDate = parseISO(history[0]);
    }

    const newDate = addDays(baseDate, numberOfDays);
    const formattedDate = format(newDate, "yyyy-MM-dd");

    const prevHistory = [...history];
    history.unshift(formattedDate);
    if (history.length > 5) history.pop();

    const changes = diff.diff(prevHistory, history);

    const template = await fs.readFile("./views/date.mustache", "utf8");

    const rendered = Mustache.render(template, {
      date: formattedDate,
      history: history,
      added: changes.added,
      removed: changes.removed,
    });

    res.send(rendered);
  } catch (err) {
    next(createAppError("Při zpracování data došlo k chybě.", 500));
  }
};

module.exports = { getCurrentDate };
