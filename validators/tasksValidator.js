const { body, validationResult } = require("express-validator");

const createAppError = require("../utils/createAppError");

const validateTask = [
  body("title")
    .notEmpty()
    .withMessage("Název úkolu je povinný.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Název úkolu musí mít alespoň 3 a maximálně 100 znaků."),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Pole 'Vytvořeno' musí obsahovat platné datum ve formátu YYYY-MM-DD (např. 2025-01-01)."
    )
    .custom((value) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 1);

      const selectedDate = new Date(value);
      if (selectedDate < today || selectedDate > maxDate) {
        throw createAppError(
          "Pole 'Vytvořeno' musí obsahovat datum mezi dnešním dnem a maximálně 1 rokem dopředu.",
          400
        );
      }
      return true;
    }),

  body("status")
    .optional()
    .isIn(["nový", "v řešení", "hotovo"])
    .withMessage(
      "Stav musí být jeden z následujících: 'nový', 'v řešení', 'hotovo'."
    ),

  (req, res, next) => {
    const allowedFields = ["title", "dueDate", "status"];
    const invalidFields = Object.keys(req.body).filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      return next(
        createAppError(
          `Pole '${invalidFields[0]}' není povoleno v žádosti.`,
          400
        )
      );
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createAppError(errors.array()[0].msg, 400));
    }

    next();
  },
];

module.exports = { validateTask };
