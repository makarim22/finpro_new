
const bwipjs = require('bwip-js'); // Import bwip-js
const Reservation = require('../models/Reservation'); // Adjust the path as needed

exports.processMockPayment = async (req, res) => {
    const { reservationId } = req.body; // Get the reservation ID from the request

    try {

        const reservation = await Reservation.findByPk(reservationId);

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        // Simulate payment success
        reservation.paymentStatus = 'Paid'; // Update payment status
        await reservation.save();

        // Generate a parking ticket
        const ticket = generateParkingTicket(reservation);

        // Generate a barcode image
        const barcodeImage = await generateBarcode(ticket.ticketId);

        // Send the ticket to the customer
        res.json({ message: 'Payment successful', ticket, barcodeImage });
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ error: 'Payment processing failed', details: error.message });
    }
};

// Function to generate a parking ticket
const generateParkingTicket = (reservation) => {
    return {
        ticketId: reservation.id, // Use 'id' for Sequelize
        // ticketId: reservation._id, // Use '_id' for Mongoose
        userId: reservation.userId,
        parkingLotId: reservation.parkingLotId,
        vehicleId: reservation.vehicleId,
        reservationDate: reservation.reservationDate,
        paymentStatus: reservation.paymentStatus,
        // Add any other details you want in the ticket
    };
};

// Function to generate a barcode image
const generateBarcode = async (ticketId) => {
    return new Promise((resolve, reject) => {
        bwipjs.toBuffer({
            bcid: 'code128',       // Barcode type
            text: ticketId.toString(), // Text to encode (ensure it's a string)
            scale: 3,              // 3x scaling factor
            height: 10,            // Bar height, in millimeters
            includetext: true,     // Show human-readable text
            textxalign: 'center',  // Align text to center
        }, (err, png) => {
            if (err) {
                reject(err);
            } else {
                resolve(`data:image/png;base64,${png.toString('base64')}`); // Return base64 encoded image
            }
        });
    });
};

