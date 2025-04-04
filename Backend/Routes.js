const express = require('express')
const router = express.Router()
const {signup,getUser,getUserById,updateUserStatus,rejectUser,loginUser} = require('./Controllers/UserController')
const {login} = require('./Controllers/AdminControllers')
const {addCandidate,getAllCandidates,voteCandidate} = require('./Controllers/CandidateControllers')

router.post('/signup',signup)
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
