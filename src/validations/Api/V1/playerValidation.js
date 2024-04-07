const { body } = require('express-validator');
const playerCreateValidationRules = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
  
    body('matches_played')
      .notEmpty()
      .withMessage('Matches played is required')
      .isInt({ min: 0 })
      .withMessage('Matches played must be a non-negative integer'),
  
    body('runs')
      .notEmpty()
      .withMessage('Runs is required')
      .isInt({ min: 0 })
      .withMessage('Runs must be a non-negative integer'),
  
    body('average')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Average must be a non-negative number'),
  
    body('strike_rate')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Strike rate must be a non-negative number')
  ];  
} 
module.exports = {
  playerCreateValidationRules
};
