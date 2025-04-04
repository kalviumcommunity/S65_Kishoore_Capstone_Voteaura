const User = require('../Models/UserModel')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const generatePassword = () => {
  return crypto.randomBytes(8).toString('hex')
}

const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kishoore004@gmail.com',
      pass: 'eiwd ovkk tifz zfqa'
    }
  })

  const mailOptions = {
    from: 'kishoore004@gmail.com',
    to: email,
    subject: subject,
    text: text
  }

  await transporter.sendMail(mailOptions)
}

const signup = async (req, res) => {
  try {
    const { name, UDid, email, phone, district, proof, UDidimg, passportImage } = req.body

    if (!name || !UDid || !email || !phone || !district || !proof || !UDidimg || !passportImage) {
      return res.status(400).json({ message: "All fields including images are required" })
    }

    const existingUser = await User.findOne({
      $or: [{ UDid: UDid.trim() }, { email: email.trim() }]
    })

    if (existingUser) {
      return res.status(400).json({ message: 'User already signed up with this UDid or Email' })
    }

    const newUser = new User({
      name: name.trim(),
      UDid: UDid.trim(),
      email: email.trim(),
      phone,
      district: district.trim(),
      proof,
      UDidimg,
      passportImage
    })

    await newUser.save()
    res.status(200).json({ message: "New User signed up successfully", newUser })
  } catch (error) {
    console.error("Error in Signup:", error)
    res.status(500).json({ message: error.message })
  }
}

const getUser = async (req, res) => {
  const { district } = req.query
  try {
    const UserDetail = await User.find({ district: district })
    res.status(200).json(UserDetail)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
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
      user.password = await bcrypt.hash(newPassword, 10)
      await sendEmail(user.email, 'Account Approved', `Your account has been approved. Your UDid is ${user.UDid} and your new password is ${newPassword}.`)
    }

    user.status = status
    await user.save()

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

    return res.status(200).json({ message: 'User rejected successfully', user })
  } catch (error) {
    console.error('Error rejecting user:', error)
    return res.status(500).json({ error: 'Error rejecting user', desc: error.message })
  }
}

const loginUser = async (req, res) => {
  try {
    const { UDid, password } = req.body

    const user = await User.findOne({ UDid })
    if (!user) {
      return res.status(404).json({ message: 'Invalid Userid or Password' })
    }

    if (!user.password) {
      return res.status(400).json({ message: 'Password not set for this user' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Userid or Password' })
    }

    return res.status(200).json({ message: 'Login successful', user })
  } catch (error) {
    console.error('Error logging in user:', error)
    return res.status(500).json({ error: 'Error logging in user', desc: error.message })
  }
}

module.exports = { signup, getUser, getUserById, updateUserStatus, rejectUser, loginUser }
