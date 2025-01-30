const { query, validationResult } = require("express-validator");

const createAppError = require("../utils/createAppError");

const checkDuplicateParam =
  (paramName) =>
  (value, { req }) => {
    if (Array.isArray(req.query[paramName])) {
      throw createAppError(
        `Duplicitní parametry '${paramName}' nejsou povoleny.`,
        400
      );
    }
    return true;
  };

const validateDateQuery = [
  query("numberOfday")
    .optional()
    .custom(checkDuplicateParam("numberOfday"))
    .isInt({ min: -365, max: 365 })
    .withMessage("'numberOfday' musí být celé číslo mezi -365 a 365."),

  query("reset")
    .optional()
    .custom(checkDuplicateParam("reset"))
    .custom((value) => {
      if (value !== "true") {
        throw createAppError(
          "'reset' může být pouze 'true', pokud je přítomen.",
          400
        );
      }
      return true;
    }),

  (req, res, next) => {
    const allowedParams = ["numberOfday", "reset"];
    const invalidParams = Object.keys(req.query).filter(
      (param) => !allowedParams.includes(param)
    );

    if (invalidParams.length > 0) {
      return next(
        createAppError(
          `Nepovolené parametry: ${invalidParams.join(", ")}.`,
          400,
          "query"
        )
      );
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createAppError(errors.array()[0].msg, 400, "query"));
    }

    next();
  },
];

module.exports = { validateDateQuery };
