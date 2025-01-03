// routes/authRoutes.js  
const express = require('express');  
const authController = require('../controllers/authController2');  

const router = express.Router();  

router.get('/login', authController.showLoginForm);  
router.post('/login', authController.login);  

module.exports = router;