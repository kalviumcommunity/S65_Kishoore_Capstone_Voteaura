const Admin = require('../Models/AdminModel')

const login = (req, res) => {
  try {
    const { userid, password, district } = req.body
    console.log(`Received login request with userid: ${userid}, password: ${password}, district: ${district}`)
    if (userid === process.env.ADMIN_USER_ID && password === process.env.ADMIN_PASSWORD) {
      return res.status(200).json({ message: 'Admin Logged In Successfully' })
    } else {
      return res.status(400).json({ message: 'Invalid Userid or Password' })
    }
  } catch (error) {
    return res.status(400).json({ message: 'Invalid Userid or Password:', error: error.message })
  }
}

module.exports = { login }
