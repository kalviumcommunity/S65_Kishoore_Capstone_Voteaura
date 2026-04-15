const express = require('express');
const router = express.Router();
const {
  sendOtp,
  verifyOtp,
  signup,
  getUser,
  getUserById,
  updateUserStatus,
  rejectUser,
  loginUser,
} = require('../Controllers/UserController');
const { upload } = require('../Config/multer');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const { validateRequiredFields, validateObjectId } = require('../middlewares/validateInput');

// ─── Public Routes ──────────────────────────────────────────────

// POST /api/users/send-otp — Send OTP to user email
router.post('/send-otp', validateRequiredFields('email'), sendOtp);

// POST /api/users/verify-otp — Verify the OTP
router.post('/verify-otp', validateRequiredFields('email', 'otp'), verifyOtp);

// POST /api/users/signup — Register a new user with document uploads
router.post(
  '/signup',
  upload.fields([
    { name: 'proof', maxCount: 2 },
    { name: 'UDidimg', maxCount: 2 },
    { name: 'passportImage', maxCount: 1 },
  ]),
  signup
);

// POST /api/users/votenow — User login for voting
router.post('/votenow', validateRequiredFields('UDid', 'password'), loginUser);

// ─── Protected Routes (Admin Only) ─────────────────────────────

// GET /api/users/ — Get users by district (admin)
router.get('/', authenticateToken, authorizeRole('admin'), getUser);

// GET /api/users/:id — Get a specific user by ID (admin)
router.get('/:id', authenticateToken, authorizeRole('admin'), validateObjectId, getUserById);

// PUT /api/users/:id/status — Approve a user (admin)
router.put(
  '/:id/status',
  authenticateToken,
  authorizeRole('admin'),
  validateObjectId,
  updateUserStatus
);

// POST /api/users/:id/reject — Reject a user (admin)
router.post(
  '/:id/reject',
  authenticateToken,
  authorizeRole('admin'),
  validateObjectId,
  rejectUser
);

module.exports = router;
