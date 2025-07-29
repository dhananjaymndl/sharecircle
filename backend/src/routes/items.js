const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/items
 * @desc    Get all items with pagination and filters
 * @access  Public
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Items listing endpoint - Coming soon in Sprint 2'
  });
});

/**
 * @route   POST /api/items
 * @desc    Create a new item listing
 * @access  Private
 */
router.post('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Create item listing endpoint - Coming soon in Sprint 2'
  });
});

/**
 * @route   GET /api/items/:id
 * @desc    Get single item by ID
 * @access  Public
 */
router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Single item endpoint - Coming soon in Sprint 2'
  });
});

/**
 * @route   PUT /api/items/:id
 * @desc    Update item listing
 * @access  Private (Owner only)
 */
router.put('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Update item endpoint - Coming soon in Sprint 2'
  });
});

/**
 * @route   DELETE /api/items/:id
 * @desc    Delete item listing
 * @access  Private (Owner only)
 */
router.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Delete item endpoint - Coming soon in Sprint 2'
  });
});

module.exports = router;
