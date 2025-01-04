// routes/userRoutes.js  
const express = require('express');  
const { isUser } = require('../middleware/authmiddleware2');  
const { authenticateJWT } = require('../middleware/authMiddleware');  
const { dashboard } = require('../controllers/parkingController');
const ticketController = require('../controllers/ticketController');
const parkingLotDetailsController = require('../controllers/parkingLotDetailsController'); 
const pagesController = require('../controllers/pagesController');  
const router = express.Router();  

router.get('/user/dashboard', authenticateJWT, isUser, dashboard);
router.get('/ticket', authenticateJWT, isUser, ticketController.getUserTickets); 
router.get('/parkinglot-details', authenticateJWT, isUser, parkingLotDetailsController.getAllParkingLots); 


// Route for About Page  
router.get('/about', authenticateJWT, isUser, pagesController.getAboutPage);  

// Route for Contact Page  
router.get('/contact', authenticateJWT, isUser, pagesController.getContactPage);  

// Handles POST request from the contact form  
router.post('/contact', authenticateJWT, isUser, pagesController.handleContactForm);  
// router.get('/user/ticket:id', authenticateJWT, isUser, dashboard);
module.exports = router;  