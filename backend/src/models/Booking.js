const db = require('../config/database');

class Booking {
  static async create(bookingData) {
    const { item_id, buyer_id, seller_id, booking_type, start_date, end_date, total_amount, message } = bookingData;
    
    const query = `
      INSERT INTO bookings (item_id, buyer_id, seller_id, booking_type, start_date, end_date, total_amount, message)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    
    const values = [item_id, buyer_id, seller_id, booking_type, start_date, end_date, total_amount, message];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findById(id) {
    const query = `
      SELECT b.*, 
             i.title as item_title, i.images as item_images,
             buyer.name as buyer_name, buyer.email as buyer_email,
             seller.name as seller_name, seller.email as seller_email
      FROM bookings b
      JOIN items i ON b.item_id = i.id
      JOIN users buyer ON b.buyer_id = buyer.id
      JOIN users seller ON b.seller_id = seller.id
      WHERE b.id = $1
    `;
    
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async findByUserId(userId, type = 'all') {
    let whereClause = '';
    if (type === 'buyer') {
      whereClause = 'WHERE b.buyer_id = $1';
    } else if (type === 'seller') {
      whereClause = 'WHERE b.seller_id = $1';
    } else {
      whereClause = 'WHERE (b.buyer_id = $1 OR b.seller_id = $1)';
    }

    const query = `
      SELECT b.*, 
             i.title as item_title, i.images as item_images, i.price as item_price,
             buyer.name as buyer_name,
             seller.name as seller_name
      FROM bookings b
      JOIN items i ON b.item_id = i.id
      JOIN users buyer ON b.buyer_id = buyer.id
      JOIN users seller ON b.seller_id = seller.id
      ${whereClause}
      ORDER BY b.created_at DESC
    `;
    
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  static async updateStatus(id, status, userId) {
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    const query = `
      UPDATE bookings 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 AND (buyer_id = $3 OR seller_id = $3)
      RETURNING *
    `;
    
    const result = await db.query(query, [status, id, userId]);
    return result.rows[0];
  }

  static async getStats(userId) {
    const query = `
      SELECT 
        COUNT(*) FILTER (WHERE buyer_id = $1) as total_purchases,
        COUNT(*) FILTER (WHERE seller_id = $1) as total_sales,
        COUNT(*) FILTER (WHERE buyer_id = $1 AND status = 'pending') as pending_purchases,
        COUNT(*) FILTER (WHERE seller_id = $1 AND status = 'pending') as pending_sales,
        COALESCE(SUM(total_amount) FILTER (WHERE seller_id = $1 AND status = 'completed'), 0) as total_earnings,
        COALESCE(SUM(total_amount) FILTER (WHERE buyer_id = $1 AND status = 'completed'), 0) as total_spent
      FROM bookings
      WHERE buyer_id = $1 OR seller_id = $1
    `;
    
    const result = await db.query(query, [userId]);
    return result.rows[0];
  }

  static async findByItemId(itemId) {
    const query = `
      SELECT b.*, 
             buyer.name as buyer_name, buyer.email as buyer_email
      FROM bookings b
      JOIN users buyer ON b.buyer_id = buyer.id
      WHERE b.item_id = $1
      ORDER BY b.created_at DESC
    `;
    
    const result = await db.query(query, [itemId]);
    return result.rows;
  }
}

module.exports = Booking;
