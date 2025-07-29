const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword
} = require('../controllers/authController');

const { authenticateToken } = require('../middleware/auth');

const {
  validateUserRegistration,
  validateUserLogin,
  validateProfileUpdate,
  validatePasswordUpdate
} = require('../middleware/validation');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', validateUserRegistration, registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', validateUserLogin, loginUser);

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', authenticateToken, getUserProfile);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', authenticateToken, validateProfileUpdate, updateUserProfile);

/**
 * @route   PUT /api/auth/password
 * @desc    Update user password
 * @access  Private
 */
router.put('/password', authenticateToken, validatePasswordUpdate, updateUserPassword);

module.exports = router;
