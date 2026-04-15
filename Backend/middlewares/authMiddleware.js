const jwt = require('jsonwebtoken');

/**
 * Middleware: Verify JWT token from Authorization header.
 * Attaches decoded user payload to `req.user` if valid.
 *
 * Usage: router.get('/protected', authenticateToken, handler)
 */
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userid, role, state, district, iat, exp }
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired. Please login again.' });
    }
    return res.status(403).json({ message: 'Invalid or malformed token.' });
  }
};

/**
 * Middleware: Role-based access control.
 * Must be used AFTER authenticateToken.
 *
 * Usage: router.get('/admin-only', authenticateToken, authorizeRole('admin'), handler)
 *
 * @param  {...string} allowedRoles - Roles permitted to access the route (e.g., 'admin', 'user')
 */
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Access denied. Insufficient permissions.',
      });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRole };
