const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/users
 * @desc    Get all users (for admin)
 * @access  Private (Admin only)
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Users endpoint - Coming soon in Sprint 2'
  });
});

module.exports = router;
