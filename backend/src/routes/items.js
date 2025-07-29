const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { validateItem } = require('../middleware/validation');

/**
 * @route   GET /api/items
 * @desc    Get all items with pagination and filters
 * @access  Public
 */
router.get('/', itemController.getAllItems);

/**
 * @route   POST /api/items
 * @desc    Create a new item listing
 * @access  Private
 */
router.post('/', validateItem, itemController.createItem);

/**
 * @route   GET /api/items/user/:userId
 * @desc    Get items by user ID
 * @access  Public
 */
router.get('/user/:userId', itemController.getUserItems);

/**
 * @route   GET /api/items/stats
 * @desc    Get user item stats
 * @access  Private
 */
router.get('/stats', itemController.getUserStats);

/**
 * @route   GET /api/items/:id
 * @desc    Get single item by ID
 * @access  Public
 */
router.get('/:id', itemController.getItemById);

/**
 * @route   PUT /api/items/:id
 * @desc    Update item listing
 * @access  Private (Owner only)
 */
router.put('/:id', itemController.updateItem);

/**
 * @route   DELETE /api/items/:id
 * @desc    Delete item listing
 * @access  Private (Owner only)
 */
router.delete('/:id', itemController.deleteItem);

module.exports = router;
