const express = require('express');  
const router = express.Router();  
const authController = require('../controllers/authController'); // Ensure this import is correct  
const parkingController = require('../controllers/parkingController');  
const { authenticateJWT } = require('../middleware/authMiddleware');  

 
// Registration route  
router.get('/register', (req, res) => {  
    res.render('register', { error: null }); // Render the registration page with no error initially  
});  

router.post('/register', authController.register); 
// Login route  
router.get('/login', (req, res) => {  
    res.render('login', { error: null }); // Render the login page  
});  

router.post('/login', authController.login);  
// logout
router.post('/logout', authController.logout); // Use POST for logout for better security  

module.exports = router;

