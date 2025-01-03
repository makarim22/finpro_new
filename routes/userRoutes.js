// routes/userRoutes.js  
const express = require('express');  
const { isUser } = require('../middleware/authmiddleware2');  
const { authenticateJWT } = require('../middleware/authMiddleware');  
const { dashboard } = require('../controllers/parkingController');
const ticketController = require('../controllers/ticketController');
const router = express.Router();  

router.get('/user/dashboard', authenticateJWT, isUser, dashboard);
router.get('/ticket', authenticateJWT, isUser, ticketController.getUserTickets); 
// router.get('/user/ticket:id', authenticateJWT, isUser, dashboard);
module.exports = router;  