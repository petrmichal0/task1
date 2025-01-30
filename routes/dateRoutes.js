const express = require("express");
const { getCurrentDate } = require("../controllers/dateController");
const { validateDateQuery } = require("../validators/dateValidator");

const router = express.Router();

router
  .route("/")
  .get(validateDateQuery, getCurrentDate);

module.exports = router;
