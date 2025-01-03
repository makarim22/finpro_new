// // controllers/ticketController.js  
// const QRCode = require('qrcode'); // For generating QR codes  
const Booking = require('../models/Booking'); // Adjust this to your Booking model path  
const User = require('../models/User');
// exports.generateTicket = async ({ params: { id: bookingId } }, res) => {  
//     try {  
//         const booking = await Booking.findOne({ where: { id: bookingId } });  

//         // Check if the booking exists  
//         if (!booking) {  
//             return res.status(404).json({ message: 'Booking not found.' });  
//         }  

//         // Create ticket data  
//         const ticketData = {  
//             id: booking.id,  
//             userName: booking.userId, // Assuming there's a relationship  
//             parkingLot: booking.parkingLotId, // Assuming there's a relationship  
//             bookingDate: booking.startTime, // Change as necessary  
//             duration: booking.duration,  
//             totalCost: booking.totalCost,  
//         };  

//         // Render or send ticket data  
//         res.render('ticket', {  
//             ticket: ticketData  
//         });  
//     } catch (error) {  
//         console.error('Error generating ticket:', error);  
//         res.status(500).json({ message: 'Error generating ticket.' });  
//     }  
// };

const sequelize = require('../config/database');  // Import sequelize for raw queries  

exports.generateTicket = async ({ params: { id: bookingId } }, res) => {  
    try {  
        // Use raw SQL to get booking and parking lot details  
        const [ticketData] = await sequelize.query(`  
            SELECT b.id AS bookingId,   
                   b."userId",   
                   b."parkingLotId",   
                   b."startTime",   
                   b.duration,   
                   b."totalCost",  
                   p.name AS parkingLotName,  
                   p.address AS parkingLotLocation  
            FROM bookings AS b  
            JOIN parking_lots AS p ON b."parkingLotId" = p.id  
            WHERE b.id = :bookingId  
        `, {  
            replacements: { bookingId }, // Safely replace the bookingId parameter  
            type: sequelize.QueryTypes.SELECT  
        });  

        // Check if the booking exists  
        if (!ticketData) {  
            return res.status(404).json({ message: 'Booking not found.' });  
        }  

        // Render or send ticket data  
        res.render('user/ticket', {  
            ticket: ticketData  
        });  
    } catch (error) {  
        console.error('Error generating ticket:', error);  
        res.status(500).json({ message: 'Error generating ticket.' });  
    }  
};

// exports.getUserTickets = async (req, res) => {  
//     const userId = req.userId; // Ensure you have the userId from the session  

//     try {  
//         // Query to get all bookings for the user  
//         const tickets = await sequelize.query(`  
//             SELECT b.id AS bookingId,   
//                    b."userId",   
//                    b."parkingLotId",   
//                    b."startTime",   
//                    b.duration,   
//                    b."totalCost",  
//                    p.name AS parkingLotName,  
//                    p.address AS parkingLotLocation  
//             FROM bookings AS b  
//             JOIN parking_lots AS p ON b."parkingLotId" = p.id  
//             WHERE b."userId" = :userId  
//         `, {  
//             replacements: { userId }, // Safely replace the userId parameter  
//             type: sequelize.QueryTypes.SELECT  
//         });  

//         // Check if there are tickets found  
//         if (!tickets.length) {  
//             return res.render('user/ticket', { tickets: [], message: 'No tickets found for this user.' });  
//         }  

//         // Render the tickets view with all the user's tickets  
//         res.render('user/ticket', { tickets });  
//     } catch (error) {  
//         console.error('Error fetching user tickets:', error);  
//         res.status(500).json({ message: 'Error fetching tickets.' });  
//     }  
// };

// exports.getUserTickets = async (req, res) => {  
//     const userId = req.userId; // Ensure you have the userId from the session  

//     try {  
//         // Query to get all bookings for the user  
//         const tickets = await sequelize.query(`  
//             SELECT b.id AS bookingId,   
//                    b."userId",   
//                    b."parkingLotId",   
//                    b."startTime",   
//                    b.duration,   
//                    b."totalCost",  
//                    p.name AS parkingLotName,  
//                    p.address AS parkingLotLocation  
//             FROM bookings AS b  
//             JOIN parking_lots AS p ON b."parkingLotId" = p.id  
//             WHERE b."userId" = :userId  
//         `, {  
//             replacements: { userId },  
//             type: sequelize.QueryTypes.SELECT  
//         });  

//         console.log(tickets); // Debugging line to check the results  

//         // Check if there are tickets found  
//         if (!tickets.length) {  
//             return res.render('user/ticket', { tickets: [], message: 'No tickets found for this user.' });  
//         }  

//         // Render the tickets view with all the user's tickets  
//         res.render('user/ticket', { tickets });  
//     } catch (error) {  
//         console.error('Error fetching user tickets:', error);  
//         res.status(500).json({ message: 'Error fetching tickets.' });  
//     }  
// };

// Assuming you're using Sequelize and Express  

// 

exports.getUserTickets = async (req, res) => {  
    const userId = req.userId; // Get userId from session  
    const bookingId = req.params.id; // Get optional bookingId from params  
    const page = parseInt(req.query.page) || 1; // Get current page, default to 1  
    const limit = parseInt(req.query.limit) || 3; // Get the number of items per page, default to 5  
    const offset = (page - 1) * limit; // Calculate offset for SQL query  

    try {  
        if (bookingId) {  
            // If bookingId is provided, fetch the specific ticket details  
            const [ticketData] = await sequelize.query(`  
                SELECT b.id AS bookingId,  
                       b."userId",  
                       b."parkingLotId",  
                       b."startTime",  
                       b.duration,  
                       b."totalCost",  
                       p.name AS parkingLotName,  
                       p.address AS parkingLotLocation  
                FROM bookings AS b  
                JOIN parking_lots AS p ON b."parkingLotId" = p.id  
                WHERE b.id = :bookingId  
                AND b."userId" = :userId  
            `, {  
                replacements: { bookingId, userId },  
                type: sequelize.QueryTypes.SELECT  
            });  

            if (!ticketData) {  
                return res.status(404).json({ message: 'Booking not found or does not belong to this user.' });  
            }  

            return res.render('user/ticket', { ticket: ticketData, tickets: [] });  
        } else {  
            // Get the total number of tickets for the user  
            const totalTickets = await sequelize.query(`  
                SELECT COUNT(*) as count   
                FROM bookings   
                WHERE "userId" = :userId  
            `, {  
                replacements: { userId },  
                type: sequelize.QueryTypes.SELECT  
            });  

            const totalPages = Math.ceil(totalTickets[0].count / limit); // Calculate total pages  
            
            // Fetch tickets for the current page  
            const tickets = await sequelize.query(`  
                SELECT b.id AS bookingId,  
                       b."userId",  
                       b."parkingLotId",  
                       b."startTime",  
                       b.duration,  
                       b."totalCost",  
                       p.name AS parkingLotName,  
                       p.address AS parkingLotLocation  
                FROM bookings AS b  
                JOIN parking_lots AS p ON b."parkingLotId" = p.id  
                WHERE b."userId" = :userId  
                ORDER BY b."startTime" DESC  
                LIMIT :limit OFFSET :offset  
            `, {  
                replacements: { userId, limit, offset },  
                type: sequelize.QueryTypes.SELECT  
            });  

            // Render the tickets view with pagination information  
            return res.render('user/ticket', { tickets, ticket: null, page, totalPages, limit });  
        }  
    } catch (error) {  
        console.error('Error fetching tickets:', error);  
        return res.status(500).json({ message: 'Error fetching tickets.' });  
    }  
};