const ParkingLot = require('../models/ParkingLot'); // Import your ParkingLot model  
const User = require('../models/User');
const sequelize = require('../config/database'); 
// exports.dashboard = async (req, res) => {  
//     try {  
//         const userId = req.session.userId;
//         const name = req.session.username // Get the user ID from the session  
//         if (!userId) {  
//             return res.redirect('/login'); // Redirect to login if no user is found  
//         }  

//         // Fetch parking lots from the database  
//         const parkingLots = await ParkingLot.findAll(); // Adjust this based on your ORM/DB setup  

//         // Render the dashboard view and pass the parkingLots data and userId  
//         res.render('dashboard', {   
//             title: 'Parking Dashboard',   
//             parkingLots,   
//             userId, // Pass the userId to the dashboard   
//             name
//         });  
//     } catch (error) {  
//         console.error('Error fetching parking lots:', error);  
//         res.render('dashboard', { title: 'Parking Dashboard', parkingLots: [], userId: null }); // Pass an empty array on error  
//     }  
// };

// exports.dashboard = async (req, res) => {  
//     try {  
//         const userId = req.session.userId; // Get user ID from session  
//         const name = req.session.username; // Get the user's name from session (make sure it's set during login)  

//         if (!userId) {  
//             return res.redirect('/login'); // Redirect to login if no user is found  
//         }  

//         // Fetch parking lots from the database (you can adjust this based on your ORM/DB setup)  
//         const parkingLots = await ParkingLot.findAll();  

//         // Admin or Superadmin dashboard logic  
//         if (req.session.role === 'admin' || req.session.role === 'superadmin') {  
//             // You may further customize what you fetch or pass to the admin dashboard if needed  
//             res.render('admin/dashboard', {   
//                 title: 'Admin Dashboard',  // Title for admin dashboard  
//                 parkingLots,               // Pass parking lots data  
//                 userId,                    // Pass user ID to the dashboard  
//                 name                        // Pass the user name  
//             });  
//         } else {  
//             return res.redirect('user/dashboard'); // Redirect to user dashboard if not admin or superadmin  
//         }  
//     } catch (error) {  
//         console.error('Error fetching parking lots:', error);  
//         res.render('admin/dashboard', { title: 'Admin Dashboard', parkingLots: [], userId: null, error: 'Error fetching parking lots' }); // Pass an empty array on error  
//     }  
// };

// exports.dashboard = async (req, res) => {  
//     try {  
//         const userId = req.session.userId; // Get user ID from session  
//         const name = req.session.username; // Get the user's name from session (make sure it's set during login)  

//         if (!userId) {  
//             return res.redirect('/login'); // Redirect to login if user is not authenticated  
//         }  

//         // Fetch parking lots using raw SQL  
//         const parkingLots = await sequelize.query(`  
//             SELECT * FROM parking_lots;  
//         `, { type: sequelize.QueryTypes.SELECT });  

//         // Check user roles and render appropriate dashboard  
//         if (req.session.role === 'admin' || req.session.role === 'superadmin') {  
//             res.render('admin/dashboard', {   
//                 title: 'Admin Dashboard',  // Title for admin dashboard  
//                 parkingLots,               // Pass parking lots data  
//                 userId,                    // Pass user ID to the dashboard  
//                 name                        // Pass the user name  
//             });  
//         } else {  
//             // Render user dashboard for regular users  
//             res.render('user/dashboard', {   
//                 title: 'User Dashboard',    // Title for user dashboard  
//                 parkingLots,                // Pass parking lots data  
//                 userId,                     // Pass user ID to the dashboard  
//                 name                         // Pass the user name  
//             });  
//         }  
//     } catch (error) {  
//         console.error('Error fetching parking lots:', error);  
//         // Optionally handle error rendering; consider a more general error page  
//         res.render('error', {   
//             message: 'Error fetching parking lots', // Render a general error page   
//             error: error.message  
//         });  
//     }  
// }; // Ensure your sequelize instance is imported  
exports.dashboard = async (req, res) => {  
    try {  
        const userId = req.userId; // Get user ID from JWT  
        const name = req.username; // Assuming the username was included in the JWT payload  
        const userRole = req.userRole; // Get the user's role from JWT  

        // Log the retrieved values for debugging  
        console.log('User ID:', userId);  
        console.log('Username:', name);  
        console.log('User Role:', userRole);  

        if (!userId) {  
            return res.redirect('/login'); // Redirect to login if user is not authenticated  
        }  

        // Fetch parking lots using raw SQL  
        const parkingLots = await sequelize.query(`  
            SELECT * FROM parking_lots;  
        `, { type: sequelize.QueryTypes.SELECT });  

        // Check user roles and render appropriate dashboard  
        if (userRole === 'admin' || userRole === 'superadmin') {  
            res.render('admin/dashboard', {   
                title: 'Admin Dashboard',  // Title for admin dashboard  
                parkingLots,               // Pass parking lots data  
                userId,                    // Pass user ID to the dashboard  
                name                        // Pass the user name  
            });  
        } else {  
            // Render user dashboard for regular users  
            res.render('user/dashboard', {   
                title: 'User Dashboard',    // Title for user dashboard  
                parkingLots,                // Pass parking lots data  
                userId,                     // Pass user ID to the dashboard  
                name                         // Pass the user name  
            });  
        }  
    } catch (error) {  
        console.error('Error fetching parking lots:', error);  
        // Optionally handle error rendering; consider a more general error page  
        res.render('error', {  
            message: 'Error fetching parking lots', // Render a general error page   
            error: error.message  
        });  
    }  
};
// exports.bookParking = async (req, res) => {  
//     try {  
//         // Create a new reservation based on user input  
//         const userId = req.session.userId; // Get userId from the session  
//         const { parkingLotId, vehicleId, startTime, endTime } = req.body;  

//         // Book the reservation  
//         const newReservation = await Reservation.create({  
//             userId,  
//             parkingLotId,  
//             vehicleId,  
//             startTime,  
//             endTime,  
//         });  

//         // Render the payment page with the reservation details  
//         res.render('payment', {  
//             reservationId: newReservation.id,  
//             ticket: {  
//                 ticketId: newReservation.id,  
//                 userId: newReservation.userId,  
//                 parkingLotId: newReservation.parkingLotId,  
//                 vehicleId: newReservation.vehicleId,  
//                 reservationDate: newReservation.reservationDate,  
//                 paymentStatus: newReservation.paymentStatus,  
//             },  
//             barcodeImage: `https://example.com/barcode/${newReservation.id}`, // Example static link to a barcode image  
//         });  
//     } catch (error) {  
//         console.error('Error booking parking:', error);  
//         res.status(500).send('Internal Server Error');  
//     }  
// };