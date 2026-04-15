const express = require('express');
const router = express.Router();

// Import all route modules
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const candidateRoutes = require('./candidateRoutes');
const queryRoutes = require('./queryRoutes');
const electionRoutes = require('./electionRoutes');
const informationRoutes = require('./informationRoutes');

// ─── Mount Routes ───────────────────────────────────────────────
// Each route group is mounted under a descriptive prefix.
// Full paths: /api/users/..., /api/admin/..., etc.

router.use('/users', userRoutes);
router.use('/admin', adminRoutes);
router.use('/candidates', candidateRoutes);
router.use('/queries', queryRoutes);
router.use('/elections', electionRoutes);
router.use('/information', informationRoutes);

// ─── Backward Compatibility Routes ─────────────────────────────
// These preserve the OLD API paths so the frontend keeps working
// without changes. Remove these once the frontend is updated.

const { sendOtp, verifyOtp, signup, getUser, getUserById, updateUserStatus, rejectUser, loginUser } = require('../Controllers/UserController');
const { login, usualLogin } = require('../Controllers/AdminControllers');
const { addCandidate, getAllCandidates, voteCandidate } = require('../Controllers/CandidateControllers');
const { querymode, getquery, sendQueryResponse, marsolved } = require('../Controllers/QueryController');
const { upload } = require('../Config/multer');

router.post('/signup', upload.fields([
  { name: 'proof', maxCount: 2 },
  { name: 'UDidimg', maxCount: 2 },
  { name: 'passportImage', maxCount: 1 },
]), signup);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/addCandidate', upload.fields([
  { name: 'profileimg', maxCount: 1 },
  { name: 'partyimg', maxCount: 1 },
]), addCandidate);
router.post('/query', querymode);
router.get('/getquery', getquery);
router.post('/sendqueryresponse', sendQueryResponse);
router.post('/marsolved/:id', marsolved);
router.get('/candidates', getAllCandidates);
router.get('/users', getUser);
router.post('/vote/:id', voteCandidate);
router.get('/users/:id', getUserById);
router.put('/users/:id/status', updateUserStatus);
router.post('/login', login);
router.post('/votenow', loginUser);
router.post('/users/:id/reject', rejectUser);
router.post('/admin-login', usualLogin);

module.exports = router;
