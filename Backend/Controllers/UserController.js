const User = require('../Models/UserModel')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const upload = require('../Config/multer')

let otpStore = {}

const generatePassword = () => crypto.randomBytes(8).toString('hex')
 
const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,   
    to: email,
    subject,
    text
  }

  await transporter.sendMail(mailOptions)
}

const sendOtp = async (req, res) => {
  const { email } = req.body
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString() 
    otpStore[email] = otp
    setTimeout(() => delete otpStore[email], 5 * 60 * 1000) 
    await sendEmail(email, 'OTP for Verification', `Your OTP is ${otp}`)
    res.status(200).json({ message: 'OTP sent successfully' })
  } catch (error) {
    console.error('Error sending OTP:', error)
    res.status(500).json({ message: 'Failed to send OTP' })
  }
}

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body
  try {
    if (otpStore[email] && otpStore[email] === otp) {
      delete otpStore[email]
      return res.status(200).json({ success: true, message: 'Email verified successfully' })
    }
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' })
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return res.status(500).json({ message: 'OTP verification failed' })
  }
}

const signup = async (req, res) => {
  try {
    const { name, UDid, email, phone, district, state } = req.body
    const { proof, UDidimg, passportImage } = req.files

    if (!name || !UDid  || !phone || !district || !state || !proof || !UDidimg || !passportImage) {
      return res.status(400).json({ message: 'All fields including images are required' })
    }
    const existingUser = await User.findOne({ UDid: UDid.trim() })
    if (existingUser) {
      return res.status(400).json({ message: 'User already signed up with this UDid' })
    }

    const newUser = new User({
      name: name.trim(),
      UDid: UDid.trim(),
      email: email.trim(),
      phone,
      district: district.trim(),
      state: state.trim(),
      proof: proof.map(file=>file.path),
      UDidimg: UDidimg.map(file=>file.path),
      passportImage: passportImage[0].path
    })

    await newUser.save()
    return res.status(200).json({ message: 'New User signed up successfully', newUser })
  } catch (error) {
    console.error('Error in Signup:', error)
    return res.status(500).json({ message: error.message })
  }
}

const getUser = async (req, res) => {
  const { district } = req.query
  try {
    const UserDetail = await User.find({ district })
    res.status(200).json(UserDetail)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (status === 'approved') {
      const newPassword = generatePassword()
      const hashedPassword = await bcrypt.hash(newPassword, 10)
      user.password = hashedPassword 
      user.status = status 
      await user.save() 
      await sendEmail(
        user.email,
        'Account Approved',
        `Your account has been approved. Your UDid is ${user.UDid} and your new password is ${newPassword}.`
      )
    } else {
      user.status = status
      await user.save()
    }

    return res.status(200).json({ message: 'User status updated successfully', user })
  } catch (error) {
    console.error('Error updating user status:', error)
    return res.status(500).json({ error: 'Error updating user status', desc: error.message })
  }
}

const rejectUser = async (req, res) => {
  try {
    const { id } = req.params
    const { reason } = req.body

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.status = 'rejected'
    await user.save()

    await sendEmail(user.email, 'Account Rejected', `Your account has been rejected. Reason: ${reason}`)
    await User.findByIdAndDelete(id)

    return res.status(200).json({ message: 'User rejected and deleted successfully', user })
  } catch (error) {
    console.error('Error rejecting user:', error)
    return res.status(500).json({ error: 'Error rejecting user', desc: error.message })
  }
}

const loginUser = async (req, res) => {
  try {
    const { UDid, password } = req.body

    const user = await User.findOne({ UDid })
    if (!user || !user.password) {
      return res.status(404).json({ message: 'Invalid Userid or Password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Userid or Password' })
    }

    if (user.status !== 'approved') {
      return res.status(403).json({ message: 'Election is not active for your state. Voting is currently stopped.' })
    }

    if (user.hasLoggedIn) {
      return res.status(401).json({ message: 'Already logged in' })
    }

    user.hasLoggedIn = true
    await user.save()

    return res.status(200).json({
      message: 'Login successful',
      user,
      userState: user.state
    })
  } catch (error) {
    console.error('Error logging in user:', error)
    return res.status(500).json({ error: 'Error logging in user', desc: error.message })
  }
}

module.exports = { sendEmail, sendOtp, verifyOtp, signup, getUser, getUserById, updateUserStatus, rejectUser, loginUser }
