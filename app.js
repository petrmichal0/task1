const express = require("express");
const path = require("path");

const dashboardRoutes = require("./routes/dashboardRoutes");
const tasksRoutes = require("./routes/tasksRoutes");
const dateRoutes = require("./routes/dateRoutes");

const { handleErrors } = require("./controllers/errorController");
const createAppError = require("./utils/createAppError");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", dashboardRoutes);
app.use("/tasks", tasksRoutes);
app.use("/date", dateRoutes);

app.all("*", (req, res, next) => {
  next(
    createAppError(
      `Nemohu najít ${req.method} ${req.originalUrl} na tomto serveru!`,
      404
    )
  );
});

app.use(handleErrors);

module.exports = app;
