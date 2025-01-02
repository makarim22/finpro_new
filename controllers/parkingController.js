const ParkingLot = require('../models/ParkingLot'); // Import your ParkingLot model  
const User = require('../models/User');

exports.dashboard = async (req, res) => {  
    try {  
        const userId = req.session.userId;
        const name = req.session.username // Get the user ID from the session  
        if (!userId) {  
            return res.redirect('/login'); // Redirect to login if no user is found  
        }  

        // Fetch parking lots from the database  
        const parkingLots = await ParkingLot.findAll(); // Adjust this based on your ORM/DB setup  

        // Render the dashboard view and pass the parkingLots data and userId  
        res.render('dashboard', {   
            title: 'Parking Dashboard',   
            parkingLots,   
            userId, // Pass the userId to the dashboard   
            name
        });  
    } catch (error) {  
        console.error('Error fetching parking lots:', error);  
        res.render('dashboard', { title: 'Parking Dashboard', parkingLots: [], userId: null }); // Pass an empty array on error  
    }  
};

exports.bookParking = async (req, res) => {  
    try {  
        // Create a new reservation based on user input  
        const userId = req.session.userId; // Get userId from the session  
        const { parkingLotId, vehicleId, startTime, endTime } = req.body;  

        // Book the reservation  
        const newReservation = await Reservation.create({  
            userId,  
            parkingLotId,  
            vehicleId,  
            startTime,  
            endTime,  
        });  

        // Render the payment page with the reservation details  
        res.render('payment', {  
            reservationId: newReservation.id,  
            ticket: {  
                ticketId: newReservation.id,  
                userId: newReservation.userId,  
                parkingLotId: newReservation.parkingLotId,  
                vehicleId: newReservation.vehicleId,  
                reservationDate: newReservation.reservationDate,  
                paymentStatus: newReservation.paymentStatus,  
            },  
            barcodeImage: `https://example.com/barcode/${newReservation.id}`, // Example static link to a barcode image  
        });  
    } catch (error) {  
        console.error('Error booking parking:', error);  
        res.status(500).send('Internal Server Error');  
    }  
};