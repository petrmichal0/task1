const fs = require("fs").promises;
const Mustache = require("mustache");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const renderErrorTemplate = async (templatePath, data) => {
  try {
    const template = await fs.readFile(templatePath, "utf8");
    return Mustache.render(template, data);
  } catch (err) {
    console.error(`Chyba při načítání šablony: ${templatePath}`, err);
    throw new Error("Chyba při vykreslování šablony.");
  }
};

const sendErrorDev = async (err, req, res) => {
  const statusCode = err.statusCode || 500;

  if (statusCode === 404 || statusCode === 500 || err.source === "query") {
    const rendered = await renderErrorTemplate("./views/dev-error.mustache", {
      statusCode,
      message: err.message,
      stack: err.stack,
      error: JSON.stringify(err, null, 2),
    });
    return res.status(statusCode).send(rendered);
  }

  console.error("ERROR 💥", err);
  return res.status(statusCode).json({
    status: err.status || "error",
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = async (err, req, res) => {
  const statusCode = err.statusCode || 500;

  if (statusCode === 404 || statusCode === 500 || err.source === "query") {
    const rendered = await renderErrorTemplate("./views/error.mustache", {
      statusCode,
      message: err.isOperational ? err.message : "Něco se hodně pokazilo!",
    });
    return res.status(statusCode).send(rendered);
  }

  if (err.isOperational) {
    return res.status(statusCode).json({
      status: err.status || "error",
      message: err.message,
    });
  }

  console.error("ERROR 💥", err);
  return res.status(500).json({
    status: "error",
    message: "Něco se hodně pokazilo!",
  });
};

const handleErrors = async (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    await sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    await sendErrorProd(err, req, res);
  } else {
    res.status(500).json({
      status: "error",
      message: "Něco se pokazilo!",
    });
  }
};

module.exports = { handleErrors };
