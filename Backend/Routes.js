const express = require('express')
const router = express.Router()
const {sendOtp,verifyOtp,signup,getUser,getUserById,updateUserStatus,rejectUser,loginUser} = require('./Controllers/UserController')
const {login,usualLogin} = require('./Controllers/AdminControllers')
const {addCandidate,getAllCandidates,voteCandidate} = require('./Controllers/CandidateControllers')
const {querymode,getquery,sendQueryResponse,marsolved}=require('./Controllers/QueryController')
const { createMessage, getMessages, deleteMessage }=require('./Controllers/InfromationController')
const {upload} = require('./Config/multer')
const {startElection,stopElection,endAllElections,getAllElections}=require('./Controllers/StateControllers')

router.post('/signup', upload.fields([
    { name: 'proof', maxCount: 2 },
    { name: 'UDidimg', maxCount: 2 },
    { name: 'passportImage', maxCount: 1 },
  ]),signup)

router.post('/send-otp', sendOtp)

router.post('/verify-otp', verifyOtp)

router.post('/addCandidate',upload.fields([
  {name:'profileimg',maxCount:1},
  {name:'partyimg',maxCount:1}
]),addCandidate)

router.post('/query',querymode)

router.get('/getquery',getquery)

router.post('/sendqueryresponse',sendQueryResponse)

router.post('/marsolved/:id',marsolved)

router.get('/candidates',getAllCandidates)

router.get('/users',getUser)

router.post('/vote/:id',voteCandidate)

router.get('/users/:id',getUserById)

router.put('/users/:id/status',updateUserStatus)

router.post('/login',login)

router.post('/votenow',loginUser)

router.post('/users/:id/reject',rejectUser)

router.post('/admin-login',usualLogin)

router.post('/createmessage', createMessage)

router.get('/getmessage', getMessages)

router.delete('/deletemessage/:id', deleteMessage)

router.post('/start', startElection)

router.post('/stop', stopElection)

router.post('/end-all', endAllElections)

router.get('/all', getAllElections)

module.exports = router