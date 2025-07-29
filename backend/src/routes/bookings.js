const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { validateBooking } = require('../middleware/validation');

/**
 * @route   GET /api/bookings
 * @desc    Get user's bookings
 * @access  Private
 */
router.get('/', bookingController.getUserBookings);

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 * @access  Private
 */
router.post('/', validateBooking, bookingController.createBooking);

/**
 * @route   GET /api/bookings/stats
 * @desc    Get user booking stats
 * @access  Private
 */
router.get('/stats', bookingController.getUserBookingStats);

/**
 * @route   GET /api/bookings/:id
 * @desc    Get single booking by ID
 * @access  Private
 */
router.get('/:id', bookingController.getBookingById);

/**
 * @route   PUT /api/bookings/:id/status
 * @desc    Update booking status
 * @access  Private
 */
router.put('/:id/status', bookingController.updateBookingStatus);

module.exports = router;
