const sequelize = require('../config/database');  

const pagesController = {  
    getAboutPage(req, res) {  
        res.render('user/about'); // Render the About page  
    },  

    getContactPage(req, res) {  
        res.render('user/contact'); // Render the Contact page  
    },  

    async handleContactForm(req, res) {  
        try {  
            const { message, email } = req.body;  
            const userId = req.userId; // Assuming userId is set on the request when the user logs in  
            const username = req.username; // Assuming the username is part of req.user  

            // Use Sequelize's query interface to insert a new contact message  
            await sequelize.query(  
                'INSERT INTO contact_messages (user_id, name, email, message) VALUES (:userId, :name, :email, :message)',  
                {  
                    replacements: {  
                        userId: userId,  
                        name: username, // Pass the username directly  
                        email: email,   
                        message: message  
                    }  
                }  
            );  

            // Log the information for verification  
            console.log(`Contact Form Submission:  
                User ID: ${userId}  
                Message: ${message}`);  

            // Send a JSON response to confirm receipt of the message  
            res.json({ success: true, message: 'Thank you for your message! We will get back to you soon.' });  
            
        } catch (error) {  
            console.error('Error handling contact form:', error); // Log the error for debugging  
            res.status(500).json({ success: false, error: 'Internal Server Error. Please try again later.' }); // Send error response as JSON  
        }  
    }  
};  

module.exports = pagesController;