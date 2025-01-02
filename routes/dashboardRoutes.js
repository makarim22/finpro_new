const express = require('express');  
const router = express.Router();  
const { dashboard } = require('../controllers/parkingController'); // Adjust the path as necessary  

// Dashboard route  
router.get('/dashboard', dashboard);  

module.exports = router;