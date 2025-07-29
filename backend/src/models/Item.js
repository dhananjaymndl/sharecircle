const db = require('../config/database');

class Item {
  static async create(itemData) {
    const { title, description, price, item_type, category, condition, images, user_id, location } = itemData;
    
    const query = `
      INSERT INTO items (title, description, price, item_type, category, condition, images, user_id, location)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    
    const values = [title, description, price, item_type, category, condition, JSON.stringify(images), user_id, location];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT i.*, u.name as user_name, u.email as user_email
      FROM items i
      JOIN users u ON i.user_id = u.id
      WHERE i.status = 'active'
    `;
    
    const values = [];
    let paramCount = 0;

    // Add filters
    if (filters.category) {
      paramCount++;
      query += ` AND i.category = $${paramCount}`;
      values.push(filters.category);
    }

    if (filters.item_type) {
      paramCount++;
      query += ` AND i.item_type = $${paramCount}`;
      values.push(filters.item_type);
    }

    if (filters.search) {
      paramCount++;
      query += ` AND (i.title ILIKE $${paramCount} OR i.description ILIKE $${paramCount})`;
      values.push(`%${filters.search}%`);
    }

    if (filters.min_price) {
      paramCount++;
      query += ` AND i.price >= $${paramCount}`;
      values.push(filters.min_price);
    }

    if (filters.max_price) {
      paramCount++;
      query += ` AND i.price <= $${paramCount}`;
      values.push(filters.max_price);
    }

    // Sorting
    const validSorts = ['created_at', 'price', 'title'];
    const sortBy = validSorts.includes(filters.sort_by) ? filters.sort_by : 'created_at';
    const sortOrder = filters.sort_order === 'asc' ? 'ASC' : 'DESC';
    query += ` ORDER BY i.${sortBy} ${sortOrder}`;

    // Pagination
    const limit = Math.min(parseInt(filters.limit) || 20, 100);
    const offset = (parseInt(filters.page) - 1 || 0) * limit;
    
    paramCount++;
    query += ` LIMIT $${paramCount}`;
    values.push(limit);
    
    paramCount++;
    query += ` OFFSET $${paramCount}`;
    values.push(offset);

    const result = await db.query(query, values);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT i.*, u.name as user_name, u.email as user_email, u.phone as user_phone
      FROM items i
      JOIN users u ON i.user_id = u.id
      WHERE i.id = $1
    `;
    
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = `
      SELECT * FROM items
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;
    
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  static async update(id, updates, userId) {
    const allowedFields = ['title', 'description', 'price', 'category', 'condition', 'images', 'location', 'status'];
    const updateFields = [];
    const values = [];
    let paramCount = 0;

    // Build dynamic update query
    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        paramCount++;
        updateFields.push(`${key} = $${paramCount}`);
        values.push(key === 'images' ? JSON.stringify(updates[key]) : updates[key]);
      }
    });

    if (updateFields.length === 0) {
      throw new Error('No valid fields to update');
    }

    paramCount++;
    values.push(id);
    paramCount++;
    values.push(userId);

    const query = `
      UPDATE items 
      SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount - 1} AND user_id = $${paramCount}
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async delete(id, userId) {
    const query = `
      DELETE FROM items
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;
    
    const result = await db.query(query, [id, userId]);
    return result.rows[0];
  }

  static async getStats(userId) {
    const query = `
      SELECT 
        COUNT(*) as total_items,
        COUNT(*) FILTER (WHERE status = 'active') as active_items,
        COUNT(*) FILTER (WHERE status = 'sold') as sold_items,
        COALESCE(SUM(price) FILTER (WHERE status = 'sold'), 0) as total_earnings
      FROM items
      WHERE user_id = $1
    `;
    
    const result = await db.query(query, [userId]);
    return result.rows[0];
  }
}

module.exports = Item;
