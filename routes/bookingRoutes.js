const express = require('express');  
const router = express.Router();  
const bookingController = require('../controllers/bookingController'); // Adjust the path to your controller  
const {isUser} = require ('../middleware/authmiddleware2') 
const { authenticateJWT } = require('../middleware/authMiddleware');
// Define the booking route and link it to the controller  
router.post('/book',authenticateJWT, isUser, bookingController.book);  

module.exports = router;