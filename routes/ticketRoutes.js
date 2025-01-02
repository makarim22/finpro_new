const express = require('express');  
const router = express.Router();  
const ticketController = require('../controllers/ticketController');  

router.get('/ticket/:id', ticketController.generateTicket);  

module.exports = router;