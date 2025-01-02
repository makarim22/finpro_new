const { Op } = require('sequelize');  
const Booking = require('./models/Booking');  
const ParkingLot = require('./models/ParkingLot'); 
// Adjust this import based on your models  

async function resetExpiredParkingSpots() {  
    try {  
        // Get the current time  
        const currentTime = new Date();  

        // Find bookings that have ended  
        const expiredBookings = await Booking.findAll({  
            where: {  
                endTime: {  
                    [Op.lt]: currentTime // Get all bookings where endTime is less than the current time  
                }  
            }  
        });  

        // Update the parking lot capacities based on expired bookings  
        for (const booking of expiredBookings) {  
            const parkingLot = await ParkingLot.findByPk(booking.parkingLotId);  

            if (!parkingLot) continue; // If the parking lot is not found, skip  

            // Reset the capacities based on the vehicle type  
            if (booking.vehicleId === 1) { // Assume 1 is for motorcycles  
                parkingLot.motorcycleAvailableSpot++;  
            } else if (booking.vehicleId === 2) { // Assume 2 is for cars  
                parkingLot.carAvailableSpot++;  
            }  

            // Save the updated parking lot with increased available spots  
            await parkingLot.save();  
        }  

        console.log('Expired parking spots have been reset.');  
    } catch (error) {  
        console.error('Error resetting expired parking spots:', error);  
    }  
}