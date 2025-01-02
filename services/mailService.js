const nodemailer = require('nodemailer');  

// Create a transport object. Replace with your SMTP service details.  
const transporter = nodemailer.createTransport({  
    host: 'smtp.ethereal.email', // For Ethereal Email (change if using different service)  
    port: 587,  
    secure: false, // true for port 465, false for other ports  
    auth: {  
        user: process.env.EMAIL_USER, // Your Ethereal Email username  
        pass: process.env.EMAIL_PASS, // Your Ethereal Email password  
    },  
});  

// Export the transporter  
module.exports = transporter;