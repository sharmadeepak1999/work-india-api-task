const { body } = require("express-validator");

const matchCreateValidationRules = () => {
  return [
    body("team_1")
      .notEmpty()
      .withMessage("Team 1 is required"),

    body("team_2")
    .notEmpty()
    .withMessage("Team 2 is required"),

    body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Invalid date format. Date must be in the format YYYY-MM-DD"),
    
    body("venue")
    .notEmpty()
    .withMessage("Venue is required")
  ];
};

module.exports = {
  matchCreateValidationRules,
};
