const express = require('express');  
const router = express.Router();  

router.get('/', (req, res) => {  
    res.render('landing'); // Render the landing.ejs view  
});  

module.exports = router;