const login = require('../../controllers/auth/loginController');
const express = require('express');
const router = express.Router();

router.get('/', login);

module.exports = router;