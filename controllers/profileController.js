const User = require("../models/User");
const Booking = require("../models/Booking");
const ParkingLot = require("../models/ParkingLot"); // Ensure ParkingLot is imported

// exports.getProfile = async (req, res) => {
//   console.log("Session userId before fetching profile:", req.session.userId);

//   // Check if user is authenticated
//   if (!req.session.userId) {
//     return res.redirect("/login"); // Redirect to login if not authenticated
//   }

//   try {
//     // Fetch the logged-in user's information
//     const user = await User.findByPk(req.session.userId, {
//       attributes: ["id", "username", "email", "coins"], // Include 'id' to access it later
//     });

//     // If the user is not found, redirect to login
//     if (!user) {
//       return res.redirect("/login");
//     }

//     // Fetch the user's booking history
//     console.log("User ID for booking query:", user.id);
//     const recentBookings = await Booking.findAll({
//       where: { userId: user.id }, // Use user.id here directly
//       // include: [
//       //     {
//       //         model: ParkingLot,
//       //         attributes: ['name'],
//       //     },
//       // ],
//       order: [["createdAt", "DESC"]],
//     });
//     // Calculate total amount and total duration
//     const totalAmountPaid = recentBookings.reduce(
//       (sum, booking) => sum + booking.totalCost,
//       0
//     );
//     const totalDuration = recentBookings.reduce(
//       (sum, booking) => sum + booking.duration,
//       0
//     );

   
//     // Log booking history for debugging
//     console.log("Booking history:", recentBookings);

//     // Render the profile view with user and bookings data
//     res.render("profile", {
//         user,
//         recentBookings,
//         totalAmountPaid,
//         totalDuration,
//       });
//   } catch (error) {
//     // Enhanced error logging
//     console.error("Error fetching profile:", error);
//     res.status(500).send("An error occurred while retrieving the profile.");
//   }
// };


// exports.getProfile = async (req, res) => {  
//   console.log("Session userId before fetching profile:", req.session.userId);  

//   // Check if user is authenticated  
//   if (!req.session.userId) {  
//     return res.redirect("/login"); // Redirect to login if not authenticated  
//   }  

//   try {  
//     // Fetch the logged-in user's information  
//     const user = await User.findByPk(req.session.userId, {  
//       attributes: ["id", "username", "email", "coins"], // Include 'id' to access it later  
//     });  

//     // If the user is not found, redirect to login  
//     if (!user) {  
//       return res.redirect("/login");  
//     }  

//     // Fetch the user's booking history along with parking lot details  
//     console.log("User ID for booking query:", user.id);  
//     const recentBookings = await Booking.findAll({  
//       where: { userId: user.id }, // Use user.id here directly  
//       include: [  
//         {  
//           model: ParkingLot,  
//           attributes: ['name', 'location'], // Include desired attributes from ParkingLot  
//         },  
//       ],  
//       order: [["createdAt", "DESC"]],  
//     });  

//     // Calculate total amount and total duration  
//     const totalAmountPaid = recentBookings.reduce(  
//       (sum, booking) => sum + booking.totalCost,  
//       0  
//     );  
//     const totalDuration = recentBookings.reduce(  
//       (sum, booking) => sum + booking.duration,  
//       0  
//     );  

//     // Log booking history for debugging  
//     console.log("Booking history:", recentBookings);  

//     // Render the profile view with user and bookings data  
//     res.render("profile", {  
//       user,  
//       recentBookings,  
//       totalAmountPaid,  
//       totalDuration,  
//     });  
//   } catch (error) {  
//     // Enhanced error logging  
//     console.error("Error fetching profile:", error);  
//     res.status(500).send("An error occurred while retrieving the profile.");  
//   }  
// };
const sequelize = require('../config/database');   // Adjust the path based on your project structure  

exports.getProfile = async (req, res) => {  
  console.log("Session userId before fetching profile:", req.session.userId);  

  // Check if user is authenticated  
  if (!req.session.userId) {  
    return res.redirect("/login"); // Redirect to login if not authenticated  
  }  

  try {  
    const userId = req.session.userId;  

    // Fetch the logged-in user's information  
    const [user] = await sequelize.query(`  
      SELECT id, username, email, coins  
      FROM users  
      WHERE id = :userId  
    `, {  
      replacements: { userId },  
      type: sequelize.QueryTypes.SELECT  
    });  

    // If the user is not found, redirect to login  
    if (!user) {  
      return res.redirect("/login");  
    }  

    // Fetch the user's booking history along with parking lot details  
    console.log("User ID for booking query:", user.id);  
    const recentBookings = await sequelize.query(`  
      SELECT b.*, p.name AS parkingLotName, p.address AS parkingLotLocation  
      FROM bookings AS b  
      JOIN parking_lots AS p ON b."parkingLotId" = p.id  
      WHERE b."userId" = :userId  
      ORDER BY b."createdAt" DESC  
    `, {  
      replacements: { userId },  
      type: sequelize.QueryTypes.SELECT  
    });  

    // Calculate total amount and total duration  
    const totalAmountPaid = recentBookings.reduce((sum, booking) => sum + booking.totalCost || 0, 0);  
    const totalDuration = recentBookings.reduce((sum, booking) => sum + booking.duration || 0, 0);  

    // Log booking history for debugging  
    console.log("Booking history:", recentBookings);  

    // Render the profile view with user and bookings data  
    res.render("profile", {  
      user,  
      recentBookings,  
      totalAmountPaid,  
      totalDuration,  
    });  
  } catch (error) {  
    // Enhanced error logging  
    console.error("Error fetching profile:", error);  
    res.status(500).send("An error occurred while retrieving the profile.");  
  }  
};