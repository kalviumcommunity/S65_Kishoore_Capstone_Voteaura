const express = require('express');
const router = express.Router();
const {signup, getUser, getUserById }=require('./Controllers/UserController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/signup', upload.fields([
    { name: 'Idproff', maxCount: 2 },
    { name: 'UDidimg', maxCount: 2 },
    { name: 'passportImage', maxCount: 1 }
  ]), signup);
router.get('/users/:id', getUserById);
router.get('/users', getUser);

module.exports = router;
