// routes/profileRoutes.js  
const express = require('express');  
const router = express.Router();  
const { authenticateJWT } = require('../middleware/authMiddleware');  
const profileController = require('../controllers/profileController'); // Import the controller  

// Profile route  
router.get('/profile',  profileController.getProfile); // Use the controller function  

module.exports = router;