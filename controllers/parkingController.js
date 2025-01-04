const ParkingLot = require("../models/ParkingLot"); // Import your ParkingLot model
const User = require("../models/User");
const sequelize = require("../config/database");
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
// exports.dashboard = async (req, res) => {
//     try {
//         const userId = req.userId; // Get user ID from JWT
//         const name = req.username; // Assuming the username was included in the JWT payload
//         const userRole = req.userRole; // Get the user's role from JWT

//         // Log the retrieved values for debugging
//         console.log('User ID:', userId);
//         console.log('Username:', name);
//         console.log('User Role:', userRole);

//         if (!userId) {
//             return res.redirect('/login'); // Redirect to login if user is not authenticated
//         }

//         // Fetch parking lots using raw SQL
//         const parkingLots = await sequelize.query(`
//             SELECT * FROM parking_lots;
//         `, { type: sequelize.QueryTypes.SELECT });
//         const bookings = await sequelize.query(`
//             SELECT * FROM bookings b
//             join parking_lots p
//             on b."ParkingLotId" = p.id;
//         `, { type: sequelize.QueryTypes.SELECT });

//         // Check user roles and render appropriate dashboard
//         if (userRole === 'admin' || userRole === 'superadmin') {
//             res.render('admin/dashboard', {
//                 title: 'Admin Dashboard',  // Title for admin dashboard
//                 parkingLots,
//                 bookings,            // Pass parking lots data
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
// };
// exports.dashboard = async (req, res) => {
//   try {
//     const userId = req.userId; // Get user ID from JWT
//     const name = req.username; // Assuming the username was included in the JWT payload
//     const userRole = req.userRole; // Get the user's role from JWT

//     // Log the retrieved values for debugging
//     console.log("User ID:", userId);
//     console.log("Username:", name);
//     console.log("User Role:", userRole);

//     if (!userId) {
//       return res.redirect("/login"); // Redirect to login if user is not authenticated
//     }

//     // Fetch parking lots using raw SQL
//     const parkingLots = await sequelize.query(
//       `  
//             SELECT * FROM parking_lots;  
//         `,
//       { type: sequelize.QueryTypes.SELECT }
//     );

//     // Fetch booking data and aggregate information
//     // Fetch booking data and aggregate information
//     const bookings = await sequelize.query(
//       `  
//     SELECT   
//         p.id AS parkingLotId,  
//         p.name AS parkingLotName,  
//         COUNT(b.id) AS bookingCount,  
//         SUM(b."totalCost") AS totalRevenue  
//     FROM bookings b  
//     JOIN parking_lots p ON b."parkingLotId" = p.id  
//     GROUP BY p.id, p.name;  
// `,
//       { type: sequelize.QueryTypes.SELECT }
//     );

//     // Log the bookings data for debugging
//     console.log("Bookings Data:", bookings); // Log the array of bookings

//     // Create a mapping of parking lots to their corresponding bookings data
//     const bookingsMap = {};
//     bookings.forEach((booking) => {
//       // Log each booking entry for validation
//       console.log("Mapping booking:", booking);

//       bookingsMap[booking.parkingLotId] = {
//         bookingCount: booking.bookingCount || 0, // Total number of bookings
//         totalRevenue: booking.totalRevenue || 0, // Total revenue generated
//       };
//     });

//     // Log the bookingsMap to see what it consists of
//     console.log("Bookings Map:", bookingsMap);

//     // Attach additional data (bookingCount and totalRevenue) to the parkingLots object
//     const parkingLotsWithData = parkingLots.map((lot) => {
//       console.log("Processing parking lot:", lot); // Log each parking lot

//       return {
//         ...lot,
//         bookingHistory: bookingsMap[lot.id]?.bookingCount || 0,
//         revenueGenerated: bookingsMap[lot.id]?.totalRevenue || 0,
//       };
//     });

//     // Log the final parkingLotsWithData to see the result
//     console.log("Parking Lots With Data:", parkingLotsWithData);

//     // Check user roles and render appropriate dashboard
//     if (userRole === "admin" || userRole === "superadmin") {
//       res.render("admin/dashboard", {
//         title: "Admin Dashboard", // Title for admin dashboard
//         parkingLots: parkingLotsWithData, // Pass modified parking lots data
//         userId, // Pass user ID to the dashboard
//         name, // Pass the user name
//       });
//     } else {
//       // Render user dashboard for regular users
//       res.render("user/dashboard", {
//         title: "User Dashboard", // Title for user dashboard
//         parkingLots, // Pass parking lots data
//         userId, // Pass user ID to the dashboard
//         name, // Pass the user name
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching parking lots:", error);
//     // Optionally handle error rendering; consider a more general error page
//     res.render("error", {
//       message: "Error fetching parking lots", // Render a general error page
//       error: error.message,
//     });
//   }
// };
exports.dashboard = async (req, res) => {  
    try {  
      const userId = req.userId; // Get user ID from JWT  
      const name = req.username; // Assuming the username was included in the JWT payload  
      const userRole = req.userRole; // Get the user's role from JWT  
  
      // Log the retrieved values for debugging  
      console.log("User ID:", userId);  
      console.log("Username:", name);  
      console.log("User Role:", userRole);  
  
      if (!userId) {  
        return res.redirect("/login"); // Redirect to login if user is not authenticated  
      }  
  
      // Fetch parking lots using raw SQL  
      const parkingLots = await sequelize.query(  
        `  
              SELECT * FROM parking_lots;  
          `,  
        { type: sequelize.QueryTypes.SELECT }  
      );  
  
      // Fetch booking data and aggregate information  
      const bookings = await sequelize.query(  
        `  
          SELECT   
              p.id AS parkingLotId,  
              p.name AS parkingLotName,  
              COUNT(b.id) AS bookingCount,  
              SUM(b."totalCost") AS totalRevenue  
          FROM bookings b  
          JOIN parking_lots p ON b."parkingLotId" = p.id  
          GROUP BY p.id, p.name;  
        `,  
        { type: sequelize.QueryTypes.SELECT }  
      );  
  
      // Log the bookings data for debugging  
      console.log("Bookings Data:", bookings); // Log the array of bookings  
  
      // Create a mapping of parking lots to their corresponding bookings data  
      const bookingsMap = {};  
      bookings.forEach((booking) => {  
        // Log each booking entry for validation  
        console.log("Mapping booking:", booking);  
  
        // Map using the exact lowercase keys from the bookings result  
        bookingsMap[booking.parkinglotid] = {  
          bookingCount: parseInt(booking.bookingcount) || 0, // Convert to integer  
          totalRevenue: parseFloat(booking.totalrevenue) || 0, // Convert to float  
        };  
      });  
  
      // Log the bookingsMap to see what it consists of  
      console.log("Bookings Map:", bookingsMap);  
  
      // Attach additional data (bookingCount and totalRevenue) to the parkingLots object  
      const parkingLotsWithData = parkingLots.map((lot) => {  
        // Log each parking lot for debugging  
        console.log("Processing parking lot:", lot);  
  
        const bookingInformation = bookingsMap[lot.id] || { bookingCount: 0, totalRevenue: 0 };  
        console.log("Booking Info for Lot ID", lot.id, ":", bookingInformation); // Log booking info for this lot  
  
        return {  
          ...lot,  
          bookingHistory: bookingInformation.bookingCount,  
          revenueGenerated: bookingInformation.totalRevenue,  
        };  
      });  
  
      // Log the final parkingLotsWithData to see the result  
      console.log("Parking Lots With Data:", parkingLotsWithData);  
  
      // Check user roles and render appropriate dashboard  
      if (userRole === "admin" || userRole === "superadmin") {  
        res.render("admin/dashboard", {  
          title: "Admin Dashboard", // Title for admin dashboard  
          parkingLots: parkingLotsWithData, // Pass modified parking lots data  
          userId, // Pass user ID to the dashboard  
          name, // Pass the user name  
        });  
      } else {  
        // Render user dashboard for regular users  
        res.render("user/dashboard", {  
          title: "User Dashboard", // Title for user dashboard  
          parkingLots, // Pass parking lots data  
          userId, // Pass user ID to the dashboard  
          name, // Pass the user name  
        });  
      }  
    } catch (error) {  
      console.error("Error fetching parking lots:", error);  
      res.render("error", {  
        message: "Error fetching parking lots", // Render a general error page  
        error: error.message,  
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
