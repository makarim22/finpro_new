const sequelize = require("../config/database");   

class UserController {  
    // Function to get the ticket for the user  
    async getTicket(req, res) {  
        const bookingId = req.query.bookingId; // Assuming you get the booking ID from query parameters  

        try {  
            // Fetch ticket information from the database (adjust the SQL as needed)  
            const result = await sequelize.query(`  
                SELECT b.id AS bookingid, u.name AS username, pl.name AS parkinglotname,  
                       b.start_time AS startTime, b.duration AS duration, b.total_cost AS totalCost  
                FROM bookings b  
                JOIN users u ON b.user_id = u.id  
                JOIN parking_lots pl ON b.parking_lot_id = pl.id  
                WHERE b.id = $1  
            `, {  
                bind: [bookingId],  
                type: sequelize.QueryTypes.SELECT  
            });  

            // Assume result[0] contains the ticket information  
            if (result.length === 0) {  
                return res.status(404).send("Ticket not found.");  
            }  

            const ticket = result[0];  

            // Render the EJS template for the ticket  
            res.render('ticket', { ticket });  
        } catch (error) {  
            console.error('Error fetching ticket:', error);  
            res.status(500).send('Server error');  
        }  
    }  
}  

module.exports = new UserController();