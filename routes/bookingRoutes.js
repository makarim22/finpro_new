const express = require('express');  
const router = express.Router();  
const bookingController = require('../controllers/bookingController'); // Adjust the path to your controller  

// Define the booking route and link it to the controller  
router.post('/book', bookingController.book);  

module.exports = router;