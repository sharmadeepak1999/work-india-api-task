const { body } = require("express-validator");

const teamCreateValidationRules = () => {
  return [
    body("team_name")
      .notEmpty()
      .withMessage("Team name is required")
  ];
};

module.exports = {
    teamCreateValidationRules,
};
