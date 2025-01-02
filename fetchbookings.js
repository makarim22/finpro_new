const db = require('./models'); // Adjust the path as necessary  

async function fetchBookingById(bookingId) {  
    try {  
        const booking = await db.Booking.findOne({  
            where: { Id: bookingId }, // Use 'Id' here for querying  
            include: [{  
                model: db.ParkingLot, // Eager load associated ParkingLot  
            }],  
        });  

        console.log(JSON.stringify(booking, null, 2));  
    } catch (error) {  
        console.error('Error fetching booking by ID:', error);  
    }  
}  

// Example invocation  
fetchBookingById(1); // Replace with an actual booking ID to fetch.