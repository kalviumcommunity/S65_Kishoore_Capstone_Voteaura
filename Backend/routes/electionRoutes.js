const express = require('express');
const router = express.Router();
const {
  startElection,
  stopElection,
  endAllElections,
  getAllElections,
} = require('../Controllers/StateControllers');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const { validateRequiredFields } = require('../middlewares/validateInput');

// ─── Public Routes ──────────────────────────────────────────────

// GET /api/elections/ — Get all election states
router.get('/', getAllElections);

// ─── Protected Routes (Admin Only) ─────────────────────────────

// POST /api/elections/start — Start an election for a state (admin)
router.post(
  '/start',
  authenticateToken,
  authorizeRole('admin'),
  validateRequiredFields('state'),
  startElection
);

// POST /api/elections/stop — Stop an election for a state (admin)
router.post(
  '/stop',
  authenticateToken,
  authorizeRole('admin'),
  validateRequiredFields('state'),
  stopElection
);

// DELETE /api/elections/end-all — End all elections (admin)
router.delete('/end-all', authenticateToken, authorizeRole('admin'), endAllElections);

module.exports = router;
