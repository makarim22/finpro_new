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
        res.render('ticket', {  
            ticket: ticketData  
        });  
    } catch (error) {  
        console.error('Error generating ticket:', error);  
        res.status(500).json({ message: 'Error generating ticket.' });  
    }  
};