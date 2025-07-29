const Booking = require('../models/Booking');
const Item = require('../models/Item');

const bookingController = {
  // Create a new booking
  async createBooking(req, res) {
    try {
      const buyer_id = req.user?.id || 1; // Default user for demo
      const { item_id, booking_type, start_date, end_date, total_amount, message } = req.body;

      const item = await Item.findById(item_id);

      if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }

      if (item.user_id === buyer_id) {
        return res.status(400).json({ success: false, message: 'You cannot book your own item' });
      }

      const bookingData = {
        item_id,
        buyer_id,
        seller_id: item.user_id,
        booking_type,
        start_date,
        end_date,
        total_amount: parseFloat(total_amount),
        message,
      };

      const newBooking = await Booking.create(bookingData);

      res.status(201).json({
        success: true,
        data: newBooking,
        message: 'Booking created successfully',
      });
    } catch (error) {
      console.error('Create booking error:', error);
      res.status(500).json({ success: false, message: 'Error creating booking', error: error.message });
    }
  },

  // Get all bookings for a user
  async getUserBookings(req, res) {
    try {
      const user_id = req.user?.id || 1; // Default user for demo
      const type = req.query.type || 'all';

      const bookings = await Booking.findByUserId(user_id, type);

      res.status(200).json({
        success: true,
        data: bookings,
      });
    } catch (error) {
      console.error('Get user bookings error:', error);
      res.status(500).json({ success: false, message: 'Error fetching bookings', error: error.message });
    }
  },

  // Get single booking by ID
  async getBookingById(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.findById(id);

      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      res.status(200).json({
        success: true,
        data: booking,
      });
    } catch (error) {
      console.error('Get booking by ID error:', error);
      res.status(500).json({ success: false, message: 'Error fetching booking', error: error.message });
    }
  },

  // Update booking status
  async updateBookingStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const user_id = req.user?.id || 1; // Default user for demo

      const updatedBooking = await Booking.updateStatus(id, status, user_id);

      if (!updatedBooking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found or you do not have permission to update it',
        });
      }

      res.status(200).json({
        success: true,
        data: updatedBooking,
        message: 'Booking status updated successfully',
      });
    } catch (error) {
      console.error('Update booking status error:', error);
      res.status(500).json({ success: false, message: 'Error updating booking status', error: error.message });
    }
  },

  // Get user booking stats
  async getUserBookingStats(req, res) {
    try {
      const user_id = req.user?.id || 1; // Default user for demo
      const stats = await Booking.getStats(user_id);

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      console.error('Get user booking stats error:', error);
      res.status(500).json({ success: false, message: 'Error fetching booking stats', error: error.message });
    }
  },
};

module.exports = bookingController;

