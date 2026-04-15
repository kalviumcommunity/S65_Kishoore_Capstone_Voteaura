const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
  deleteMessage,
} = require('../Controllers/InfromationController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const { validateRequiredFields, validateObjectId } = require('../middlewares/validateInput');

// ─── Public Routes ──────────────────────────────────────────────

// GET /api/information/ — Get all information messages
router.get('/', getMessages);

// ─── Protected Routes (Admin Only) ─────────────────────────────

// POST /api/information/ — Create a new information message (admin)
router.post(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  validateRequiredFields('heading', 'text'),
  createMessage
);

// DELETE /api/information/:id — Delete an information message (admin)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  validateObjectId,
  deleteMessage
);

module.exports = router;
