const express = require('express')
const router = express.Router()
const {sendOtp,verifyOtp,signup,getUser,getUserById,updateUserStatus,rejectUser,loginUser} = require('./Controllers/UserController')
const {login} = require('./Controllers/AdminControllers')
const {addCandidate,getAllCandidates,voteCandidate} = require('./Controllers/CandidateControllers')
const {upload} = require('./Config/multer')

router.post('/signup', upload.fields([
    { name: 'proof', maxCount: 2 },
    { name: 'UDidimg', maxCount: 2 },
    { name: 'passportImage', maxCount: 1 },
  ]),signup)
router.post('/send-otp', sendOtp)
router.post('/verify-otp', verifyOtp)
router.post('/addCandidate',addCandidate)
router.get('/candidates',getAllCandidates)
router.get('/users',getUser)
router.post('/vote/:id',voteCandidate)
router.get('/users/:id',getUserById)
router.put('/users/:id/status',updateUserStatus)
router.post('/login',login)
router.post('/votenow',loginUser)
router.post('/users/:id/reject',rejectUser)

module.exports = router