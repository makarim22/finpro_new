// routes/profileRoutes.js  
const express = require('express');  
const router = express.Router();  
const { isUser } = require('../middleware/authmiddleware2');  
const { authenticateJWT } = require('../middleware/authMiddleware');  
const profileController = require('../controllers/profileController'); // Import the controller  

// Profile route  
router.get('/profile', authenticateJWT, isUser, profileController.getProfile); // Use the controller function  

module.exports = router;