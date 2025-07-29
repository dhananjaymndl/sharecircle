const Item = require('../models/Item');

const itemController = {
  // Get all items with filters and pagination
  async getAllItems(req, res) {
    try {
      const filters = {
        category: req.query.category,
        item_type: req.query.item_type,
        search: req.query.search,
        min_price: req.query.min_price,
        max_price: req.query.max_price,
        sort_by: req.query.sort_by,
        sort_order: req.query.sort_order,
        page: req.query.page || 1,
        limit: req.query.limit || 20
      };

      const items = await Item.findAll(filters);
      
      // Parse images JSON for each item
      const parsedItems = items.map(item => ({
        ...item,
        images: item.images ? JSON.parse(item.images) : []
      }));

      res.status(200).json({
        success: true,
        data: parsedItems,
        pagination: {
          page: parseInt(filters.page),
          limit: parseInt(filters.limit)
        }
      });
    } catch (error) {
      console.error('Get items error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching items',
        error: error.message
      });
    }
  },

  // Get single item by ID
  async getItemById(req, res) {
    try {
      const { id } = req.params;
      const item = await Item.findById(id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Item not found'
        });
      }

      // Parse images JSON
      item.images = item.images ? JSON.parse(item.images) : [];

      res.status(200).json({
        success: true,
        data: item
      });
    } catch (error) {
      console.error('Get item error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching item',
        error: error.message
      });
    }
  },

  // Create new item
  async createItem(req, res) {
    try {
      const { title, description, price, item_type, category, condition, images, location } = req.body;
      const user_id = req.user?.id || 1; // Default user for demo

      // Validation
      if (!title || !description || !price || !item_type || !category) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }

      const itemData = {
        title,
        description,
        price: parseFloat(price),
        item_type,
        category,
        condition: condition || 'Good',
        images: images || [],
        user_id,
        location
      };

      const newItem = await Item.create(itemData);
      
      // Parse images for response
      newItem.images = newItem.images ? JSON.parse(newItem.images) : [];

      res.status(201).json({
        success: true,
        data: newItem,
        message: 'Item created successfully'
      });
    } catch (error) {
      console.error('Create item error:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating item',
        error: error.message
      });
    }
  },

  // Update item
  async updateItem(req, res) {
    try {
      const { id } = req.params;
      const user_id = req.user?.id || 1; // Default user for demo
      const updates = req.body;

      const updatedItem = await Item.update(id, updates, user_id);

      if (!updatedItem) {
        return res.status(404).json({
          success: false,
          message: 'Item not found or you do not have permission to update it'
        });
      }

      // Parse images for response
      updatedItem.images = updatedItem.images ? JSON.parse(updatedItem.images) : [];

      res.status(200).json({
        success: true,
        data: updatedItem,
        message: 'Item updated successfully'
      });
    } catch (error) {
      console.error('Update item error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating item',
        error: error.message
      });
    }
  },

  // Delete item
  async deleteItem(req, res) {
    try {
      const { id } = req.params;
      const user_id = req.user?.id || 1; // Default user for demo

      const deletedItem = await Item.delete(id, user_id);

      if (!deletedItem) {
        return res.status(404).json({
          success: false,
          message: 'Item not found or you do not have permission to delete it'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Item deleted successfully'
      });
    } catch (error) {
      console.error('Delete item error:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting item',
        error: error.message
      });
    }
  },

  // Get user's items
  async getUserItems(req, res) {
    try {
      const user_id = req.user?.id || req.params.userId || 1; // Default user for demo
      const items = await Item.findByUserId(user_id);
      
      // Parse images JSON for each item
      const parsedItems = items.map(item => ({
        ...item,
        images: item.images ? JSON.parse(item.images) : []
      }));

      res.status(200).json({
        success: true,
        data: parsedItems
      });
    } catch (error) {
      console.error('Get user items error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching user items',
        error: error.message
      });
    }
  },

  // Get user stats
  async getUserStats(req, res) {
    try {
      const user_id = req.user?.id || 1; // Default user for demo
      const stats = await Item.getStats(user_id);

      res.status(200).json({
        success: true,
        data: {
          total_items: parseInt(stats.total_items) || 0,
          active_items: parseInt(stats.active_items) || 0,
          sold_items: parseInt(stats.sold_items) || 0,
          total_earnings: parseFloat(stats.total_earnings) || 0
        }
      });
    } catch (error) {
      console.error('Get user stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching user stats',
        error: error.message
      });
    }
  }
};

module.exports = itemController;
