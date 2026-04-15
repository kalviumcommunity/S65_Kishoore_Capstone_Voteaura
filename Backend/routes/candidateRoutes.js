const express = require('express');
const router = express.Router();
const {
  addCandidate,
  getAllCandidates,
  voteCandidate,
} = require('../Controllers/CandidateControllers');
const { upload } = require('../Config/multer');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const { validateObjectId } = require('../middlewares/validateInput');

// ─── Public Routes ──────────────────────────────────────────────

// GET /api/candidates/ — Get all candidates
router.get('/', getAllCandidates);

// POST /api/candidates/vote/:id — Cast a vote for a candidate
router.post('/vote/:id', validateObjectId, voteCandidate);

// ─── Protected Routes (Admin Only) ─────────────────────────────

// POST /api/candidates/add — Add a new candidate with images (admin)
router.post(
  '/add',
  authenticateToken,
  authorizeRole('admin'),
  upload.fields([
    { name: 'profileimg', maxCount: 1 },
    { name: 'partyimg', maxCount: 1 },
  ]),
  addCandidate
);

module.exports = router;
