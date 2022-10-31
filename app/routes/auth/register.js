const register = require('../../controllers/auth/registerController');
const userAuth = require('../../middleware/userAuth');
const express = require('express');
const router = express.Router();

router.all('/', userAuth.saveUser, register);

module.exports = router;