const express = require('express');  
const router = express.Router();  
const { isUser } = require('../middleware/authmiddleware2');  
const { authenticateJWT } = require('../middleware/authMiddleware'); 
const ticketController= require('../controllers/ticketController');  

// Route to render the ticket page  
router.get('/user/ticket', authenticateJWT, isUser,, ticketController.generateTicket); // Adjust to your actual controller method  

module.exports = router;