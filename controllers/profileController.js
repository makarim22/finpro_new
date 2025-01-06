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
const sequelize = require("../config/database"); // Adjust the path based on your project structure

exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId; // Get user ID from JWT
    const name = req.username; // Assuming the username was included in the JWT payload
    const userRole = req.userRole; // Get the user's role from JWT

    // Check if user is authenticated
    if (!userId) {
      return res.redirect("/login"); // Redirect to login if not authenticated
    }

    // Fetch the logged-in user's information
    const [user] = await sequelize.query(
      `  
            SELECT id, username, email, coins  
            FROM users  
            WHERE id = :userId  
        `,
      {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // If the user is not found, redirect to login
    if (!user) {
      return res.redirect("/login");
    }

    // Fetch the user's booking history along with parking lot details
    const recentBookings = await sequelize.query(
      `  
            SELECT b.*, p.name AS parkingLotName, p.address AS parkingLotLocation  
            FROM bookings AS b  
            JOIN parking_lots AS p ON b."parkingLotId" = p.id  
            WHERE b."userId" = :userId  
            ORDER BY b."createdAt" DESC  
        `,
      {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Fetch the user's booking count
    const [bookingCountResult] = await sequelize.query(
      `  
    SELECT COUNT(*) AS bookingcount  -- Ensure the alias matches the casing from the returned object  
    FROM bookings   
    WHERE "userId" = :userId  
`,
      {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Log the raw result to check what is being returned.
    console.log("Raw Booking Count Result:", bookingCountResult);

    // Correctly access the booking count using camel case to prevent NaN
    const bookingCount =
      bookingCountResult.bookingcount !== null
        ? parseInt(bookingCountResult.bookingcount, 10)
        : 0;

    // Log the booking count to ensure it's being processed correctly.
    console.log("Booking Count:", bookingCount);

    // Calculate total amount and total duration
    const totalAmountPaid = recentBookings.reduce(
      (sum, booking) => sum + booking.totalCost || 0,
      0
    );
    const totalDuration = recentBookings.reduce(
      (sum, booking) => sum + booking.duration || 0,
      0
    );

    // Render the profile view with user and bookings data
    res.render("user/profile", {
      title: "User Profile", // Title for user profile
      user, // Pass user information
      recentBookings, // Pass recent bookings data
      totalAmountPaid, // Pass total amount paid
      totalDuration,
      bookingCount, // Pass total booking
      userId, // Pass user ID for potential use in the view
      name, // Pass the user name
      userRole, // Pass the user role to the view if needed
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    // Enhanced error logging; consider rendering a more general error page
    res.render("error", {
      message: "Error fetching profile", // Render a general error page
      error: error.message,
    });
  }
};
