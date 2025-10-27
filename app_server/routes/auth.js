const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// route register
router.post('/register', authController.register);

// route login  DIBUGGED
router.post('/login', authController.login);

// route profile
router.get('/profile', authController.profile);

module.exports = router;
