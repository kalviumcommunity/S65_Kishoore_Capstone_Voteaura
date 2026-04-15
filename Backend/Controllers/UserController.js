const User = require('../Models/UserModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ─── In-Memory OTP Store ────────────────────────────────────────
// NOTE: This works for single-server setups. For production with
// multiple servers, use Redis or a database for OTP storage.
let otpStore = {};

/**
 * Generate a random 16-character hex password.
 */
const generatePassword = () => crypto.randomBytes(8).toString('hex');

/**
 * Send an email using Nodemailer (Gmail SMTP).
 * @param {string} email - Recipient email address
 * @param {string} subject - Email subject line
 * @param {string} text - Email body text
 */
const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text,
  });
};

/**
 * POST /api/users/send-otp
 * Generate and email a 6-digit OTP. Expires in 5 minutes.
 */
const sendOtp = async (req, res, next) => {
  const { email } = req.body;
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    // Auto-expire OTP after 5 minutes
    setTimeout(() => delete otpStore[email], 5 * 60 * 1000);

    await sendEmail(email, 'OTP for Verification', `Your OTP is ${otp}`);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    next(error);
  }
};

/**
 * POST /api/users/verify-otp
 * Verify a previously sent OTP.
 */
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (otpStore[email] && otpStore[email] === otp) {
      delete otpStore[email];
      return res.status(200).json({ success: true, message: 'Email verified successfully' });
    }
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'OTP verification failed' });
  }
};

/**
 * POST /api/users/signup
 * Register a new user with document uploads (proof, UDid image, passport photo).
 */
const signup = async (req, res, next) => {
  try {
    const { name, UDid, email, phone, district, state } = req.body;
    const { proof, UDidimg, passportImage } = req.files || {};

    if (!name || !UDid || !email || !phone || !district || !state || !proof || !UDidimg || !passportImage) {
      return res.status(400).json({ message: 'All fields including images are required' });
    }

    const existingUser = await User.findOne({ UDid: UDid.trim() });
    if (existingUser) {
      return res.status(409).json({ message: 'User already signed up with this UDid' });
    }

    const newUser = new User({
      name: name.trim(),
      UDid: UDid.trim(),
      email: email.trim(),
      phone,
      district: district.trim(),
      state: state.trim(),
      proof: proof[0].path,
      UDidimg: UDidimg[0].path,
      passportImage: passportImage[0].path,
    });

    await newUser.save();
    return res.status(201).json({ message: 'New user signed up successfully', newUser });
  } catch (error) {
    console.error('Error in Signup:', error);
    next(error);
  }
};

/**
 * GET /api/users/
 * Get users filtered by district (query param).
 */
const getUser = async (req, res, next) => {
  const { district } = req.query;
  try {
    const users = await User.find(district ? { district } : {}).select('-password');
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/users/:id
 * Get a single user by their MongoDB ID.
 */
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/users/:id/status
 * Update user status (approve/reject). On approval, generates a
 * password and emails it along with the user's UDid.
 */
const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (status === 'approved') {
      const newPassword = generatePassword();
      user.password = await bcrypt.hash(newPassword, 10);
      await sendEmail(
        user.email,
        'Account Approved',
        `Your account has been approved.\nYour UDid: ${user.UDid}\nYour password: ${newPassword}`
      );
    }

    user.status = status;
    await user.save();

    return res.status(200).json({ message: 'User status updated successfully', user });
  } catch (error) {
    console.error('Error updating user status:', error);
    next(error);
  }
};

/**
 * POST /api/users/:id/reject
 * Reject a user and notify them via email with the reason.
 */
const rejectUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.status = 'rejected';
    await user.save();

    await sendEmail(
      user.email,
      'Account Rejected',
      `Your account has been rejected.\nReason: ${reason || 'No reason provided'}`
    );

    return res.status(200).json({ message: 'User rejected successfully', user });
  } catch (error) {
    console.error('Error rejecting user:', error);
    next(error);
  }
};

/**
 * POST /api/users/votenow
 * User login for the voting page using UDid and password.
 * Returns a JWT token on success.
 */
const loginUser = async (req, res, next) => {
  try {
    const { UDid, password } = req.body;

    const user = await User.findOne({ UDid });
    if (!user) {
      return res.status(401).json({ message: 'Invalid UDid or password' });
    }

    if (!user.password) {
      return res.status(400).json({ message: 'Password not set. Your account may not be approved yet.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid UDid or password' });
    }

    // Generate JWT token for authenticated user session
    const token = jwt.sign(
      { userId: user._id, UDid: user.UDid, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '24h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        UDid: user.UDid,
        email: user.email,
        district: user.district,
        state: user.state,
        status: user.status,
      },
      token,
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    next(error);
  }
};

module.exports = {
  sendEmail,
  sendOtp,
  verifyOtp,
  signup,
  getUser,
  getUserById,
  updateUserStatus,
  rejectUser,
  loginUser,
};
