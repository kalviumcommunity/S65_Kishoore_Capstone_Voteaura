const express = require('express')
const router = express.Router()
const multer = require('multer')
const { signup, getUser, getUserById, updateUserStatus, rejectUser, loginUser } = require('./Controllers/UserController')
const { login } = require('./Controllers/AdminControllers')
const { addCandidate, getAllCandidates, voteCandidate } = require('./Controllers/CandidateControllers')
const upload = multer({ dest: 'uploads/' })

router.post('/signup', upload.fields([
  { name: 'Idproff', maxCount: 2 },
  { name: 'UDidimg', maxCount: 2 },
  { name: 'passportImage', maxCount: 1 }
]), signup)

router.post('/addCandidate', upload.fields([
  { name: 'profileimg', maxCount: 1 },
  { name: 'partyimg', maxCount: 1 }
]), addCandidate)

router.get('/candidates', getAllCandidates)
router.get('/users', getUser)
router.post('/vote/:id', voteCandidate)
router.get('/users/:id', getUserById)
router.put('/users/:id/status', updateUserStatus)
router.post('/login', login)
router.post('/votenow', loginUser)
router.post('/users/:id/reject', rejectUser)

module.exports = router
