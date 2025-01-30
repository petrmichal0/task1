const express = require("express");
const { getCurrentDate } = require("../controllers/dateController");
const { validateDateQuery } = require("../validators/dateValidator");

const router = express.Router();

router.get("/", validateDateQuery, getCurrentDate);

module.exports = router;
