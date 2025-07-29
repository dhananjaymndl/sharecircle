const { body, validationResult } = require('express-validator');

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

/**
 * Validation rules for user registration
 */
const validateUserRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location must not exceed 100 characters'),
  handleValidationErrors
];

/**
 * Validation rules for user login
 */
const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

/**
 * Validation rules for profile update
 */
const validateProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location must not exceed 100 characters'),
  handleValidationErrors
];

/**
 * Validation rules for password update
 */
const validatePasswordUpdate = [
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateProfileUpdate,
  validatePasswordUpdate,
  handleValidationErrors
};
