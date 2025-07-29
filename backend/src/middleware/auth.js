const { verifyToken, extractToken } = require('../utils/jwt');
const { supabase } = require('../config/database');

/**
 * Middleware to authenticate users using JWT
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractToken(authHeader);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }

    // Verify the token
    const decoded = verifyToken(token);
    
    // Get user from database to ensure they still exist
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, phone, location, created_at')
      .eq('id', decoded.userId)
      .single();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token or user not found'
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

/**
 * Middleware to check if user is admin (for future use)
 */
const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Check if user has admin role
    const { data: userRole, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', req.user.id)
      .single();

    if (error || userRole?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error checking admin privileges'
    });
  }
};

module.exports = {
  authenticateToken,
  requireAdmin,
};
