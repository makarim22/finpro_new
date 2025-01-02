const express = require('express');  
const { manageParkingLots, deductSpot, deductMotorcycleSpot } = require('../controllers/adminController');  

const router = express.Router();  

// Route to get the manage parking lots interface  
router.get('/admin/manage-parking-lots', manageParkingLots);  

// Route to deduct car spots  
router.post('/admin/deduct-spot', deductSpot);  

// Route to deduct motorcycle spots  
router.post('/admin/deduct-motorcycle-spot', deductMotorcycleSpot);  

module.exports = router;