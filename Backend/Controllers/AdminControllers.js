const jwt = require('jsonwebtoken')
const Admin = require('../Models/AdminModel')

const login = (req, res) => {
  try {
    const { userid, password,state, district } = req.body
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET is not set' })
    }
    if (userid === process.env.ADMIN_USER_ID && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ userid,state, district, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' })
      return res.status(200).json({ message: 'Admin Logged In Successfully', token })
    } else {
      return res.status(400).json({ message: 'Invalid Userid or Password' })
    }
    
  } catch (error) {
    return res.status(500).json({ message: 'Login failed due to server error', error: error.message })
  }
}

const usualLogin = (req, res) => {
  const { userid, password } = req.body;

  if (
    userid === process.env.ADMIN_USER_ID &&
    password === process.env.ADMIN_PASSWORD
  ) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};



module.exports = { login ,usualLogin}