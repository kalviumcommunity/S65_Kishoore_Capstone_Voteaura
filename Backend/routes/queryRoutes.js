const express = require('express');
const router = express.Router();
const {
  querymode,
  getquery,
  sendQueryResponse,
  marsolved,
} = require('../Controllers/QueryController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const { validateRequiredFields, validateObjectId } = require('../middlewares/validateInput');

// ─── Public Routes ──────────────────────────────────────────────

// POST /api/queries/ — Submit a new query
router.post('/', validateRequiredFields('email', 'subject', 'message'), querymode);

// ─── Protected Routes (Admin Only) ─────────────────────────────

// GET /api/queries/ — Get all queries (admin)
router.get('/', authenticateToken, authorizeRole('admin'), getquery);

// POST /api/queries/respond — Send email response to a query (admin)
router.post(
  '/respond',
  authenticateToken,
  authorizeRole('admin'),
  validateRequiredFields('email', 'subject', 'message'),
  sendQueryResponse
);

// POST /api/queries/:id/solve — Mark a query as solved (admin)
router.post(
  '/:id/solve',
  authenticateToken,
  authorizeRole('admin'),
  validateObjectId,
  marsolved
);

module.exports = router;
