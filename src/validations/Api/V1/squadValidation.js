const { body } = require("express-validator");

const squadCreateValidationRules = () => {
  return [
    body("player_id")
      .notEmpty()
      .withMessage("Player id is required"),
    body("role")
      .notEmpty()
      .withMessage("Role is required")
  ];
};

module.exports = {
  squadCreateValidationRules,
};
