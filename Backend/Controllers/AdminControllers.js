const jwt = require('jsonwebtoken');

/**
 * POST /api/admin/login
 * Admin login — validates credentials and returns a JWT token.
 */
const login = (req, res) => {
  try {
    const { userid, password, state, district } = req.body;

    if (!process.env.JWT_SECRET) {
      console.error('CRITICAL: JWT_SECRET is not configured in environment variables.');
      return res.status(500).json({ message: 'Server configuration error.' });
    }

    // NOTE: For production, store ADMIN_PASSWORD as a bcrypt hash in .env
    // and use bcrypt.compare() instead of direct string comparison.
    if (userid === process.env.ADMIN_USER_ID && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { userid, state, district, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY || '1h' }
      );

      return res.status(200).json({
        message: 'Admin logged in successfully',
        token,
      });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ message: 'Login failed due to server error' });
  }
};

/**
 * POST /api/admin/admin-login
 * Admin login with redirect path based on `from` field.
 * Used by the frontend for page-based navigation.
 */
const usualLogin = (req, res) => {
  try {
    const { userid, password, from } = req.body;

    if (userid === process.env.ADMIN_USER_ID && password === process.env.ADMIN_PASSWORD) {
      const redirectMap = {
        homepage: '/admin',
        userpage: '/',
      };

      const redirectTo = redirectMap[from] || '/query';
      return res.status(200).json({ success: true, redirectTo });
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (error) {
    console.error('Admin usual login error:', error);
    return res.status(500).json({ success: false, message: 'Login failed due to server error' });
  }
};

module.exports = { login, usualLogin };