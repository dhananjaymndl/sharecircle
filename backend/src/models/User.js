const { supabase } = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Object} Created user or error
   */
  static async create(userData) {
    try {
      const { email, password, name, phone, location } = userData;
      
      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            email: email.toLowerCase(),
            password_hash: hashedPassword,
            name,
            phone,
            location,
            role: 'user',
            created_at: new Date().toISOString()
          }
        ])
        .select('id, email, name, phone, location, created_at')
        .single();
      
      if (error) {
        throw error;
      }
      
      return { success: true, user: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Find user by email
   * @param {String} email - User email
   * @returns {Object} User or null
   */
  static async findByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  }

  /**
   * Find user by ID
   * @param {String} userId - User ID
   * @returns {Object} User or null
   */
  static async findById(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, name, phone, location, role, created_at')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      return null;
    }
  }

  /**
   * Verify user password
   * @param {String} password - Plain text password
   * @param {String} hashedPassword - Hashed password from database
   * @returns {Boolean} Password match result
   */
  static async verifyPassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  }

  /**
   * Update user profile
   * @param {String} userId - User ID
   * @param {Object} updateData - Data to update
   * @returns {Object} Updated user or error
   */
  static async updateProfile(userId, updateData) {
    try {
      const allowedFields = ['name', 'phone', 'location'];
      const filteredData = {};
      
      // Only allow updating specific fields
      Object.keys(updateData).forEach(key => {
        if (allowedFields.includes(key)) {
          filteredData[key] = updateData[key];
        }
      });
      
      if (Object.keys(filteredData).length === 0) {
        return { success: false, error: 'No valid fields to update' };
      }
      
      filteredData.updated_at = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('users')
        .update(filteredData)
        .eq('id', userId)
        .select('id, email, name, phone, location, created_at, updated_at')
        .single();
      
      if (error) {
        throw error;
      }
      
      return { success: true, user: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Update user password
   * @param {String} userId - User ID
   * @param {String} newPassword - New password
   * @returns {Object} Success status or error
   */
  static async updatePassword(userId, newPassword) {
    try {
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      
      const { error } = await supabase
        .from('users')
        .update({ 
          password_hash: hashedPassword,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (error) {
        throw error;
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = User;
