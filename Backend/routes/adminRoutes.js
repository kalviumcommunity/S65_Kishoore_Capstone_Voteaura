const express = require('express');
const router = express.Router();
const { login, usualLogin } = require('../Controllers/AdminControllers');
const { validateRequiredFields } = require('../middlewares/validateInput');

// POST /api/admin/login — Admin login with JWT token generation
router.post('/login', validateRequiredFields('userid', 'password'), login);

// POST /api/admin/admin-login — Admin login with redirect (no JWT)
router.post('/admin-login', validateRequiredFields('userid', 'password'), usualLogin);

module.exports = router;
