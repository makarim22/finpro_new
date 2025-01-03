const express = require('express');  
const router = express.Router();  
const UserController = require('../controllers/UserController');  

// Route to render the ticket page  
router.get('/ticket', UserController.getTicket); // Adjust to your actual controller method  

module.exports = router;