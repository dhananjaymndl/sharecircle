const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

/**
 * Register a new user
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 */
const registerUser = async (req, res) => {
  try {
    const { email, password, name, phone, location } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create new user
    const result = await User.create({ email, password, name, phone, location });
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error
      });
    }

    // Generate JWT
    const token = generateToken({ userId: result.user.id });

    return res.status(201).json({
      success: true,
      token,
      user: result.user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error registering user'
    });
  }
};

/**
 * User login
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isMatch = await User.verifyPassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT
    const token = generateToken({ userId: user.id });

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        created_at: user.created_at
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error logging in'
    });
  }
};

/**
 * Get current user profile
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 */
const getUserProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching profile'
    });
  }
};

/**
 * Update user profile
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 */
const updateUserProfile = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const updateData = req.body;

    const result = await User.updateProfile(userId, updateData);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error
      });
    }

    return res.status(200).json({
      success: true,
      user: result.user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
};

/**
 * Update user password
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 */
const updateUserPassword = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password is required'
      });
    }

    const result = await User.updatePassword(userId, newPassword);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating password'
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword
};
