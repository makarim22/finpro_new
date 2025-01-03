const ParkingLot = require("../models/ParkingLot");
const User = require("../models/User");
const Booking = require("../models/Booking");
const { Op } = require("sequelize");
const transporter = require("../services/mailService"); // Adjust the path accordingly

exports.book = async (req, res) => {  
  try {  
    const userId = req.userId; // Get the user ID from the session  
    const { parkingLotId, vehicleType, startTime, endTime } = req.body;  

    // Validate input fields  
    if (!userId || !parkingLotId || !vehicleType || !startTime || !endTime) {  
      return res.status(400).send("Please provide all required fields.");  
    }  

    const start = new Date(startTime);  
    const end = new Date(endTime);  

    // Ensure start time is before end time  
    if (start >= end) {  
      return res.status(400).send("End time must be after start time.");  
    }  

    // Fetch the parking lot and validate  
    const parkingLot = await ParkingLot.findByPk(parkingLotId);  
    if (!parkingLot) {  
      return res.status(404).send("Parking Lot not found.");  
    }  

    let vehicleId;  
    let tariff;  

    // Determine vehicle type and tariff rate  
    switch (vehicleType) {  
      case "motorcycle":  
        vehicleId = 1;  
        tariff = parkingLot.motorcycle_tariff;  
        // Check for motorcycle spot availability  
        if (parkingLot.motorcycleAvailableSpot <= 0) {  
          return res.status(400).send("No motorcycle spots available.");  
        }  
        parkingLot.motorcycleAvailableSpot--; // Decrease available motorcycle spots  
        break;  

      case "car":  
        vehicleId = 2;  
        tariff = parkingLot.car_tariff;  
        // Check for car spot availability  
        if (parkingLot.carAvailableSpot <= 0) {  
          return res.status(400).send("No car spots available.");  
        }  
        parkingLot.carAvailableSpot--; // Decrease available car spots  
        break;  

      default:  
        return res.status(400).send("Invalid vehicle type specified.");  
    }  

    // Check for conflicting bookings  
    // const existingBooking = await Booking.findOne({  
    //   where: {  
    //     parkingLotId: parkingLotId,  
    //     userId: userId,  
    //     [Op.or]: [  
    //       {  
    //         startTime: {  
    //           [Op.lt]: end, // Booking starts before another booking ends  
    //         },  
    //         endTime: {  
    //           [Op.gt]: start, // Booking ends after another booking starts  
    //         },  
    //       },  
    //     ],  
    //   },  
    // });  

    // if (existingBooking) {  
    //   return res  
    //     .status(400)  
    //     .send("You already have a booking in this parking lot at that time.");  
    // }  

    // Calculate total cost and check user's balance  
    const durationInHours = Math.ceil((end - start) / (1000 * 60 * 60));  
    const totalCost = tariff * durationInHours;  

    // Retrieve the user to check and update their balance  
    const user = await User.findByPk(userId);  
    if (!user) {  
      return res.status(404).send("User not found.");  
    }  

    // Check if user has sufficient balance  
    if (user.coins < totalCost) {  
      return res.status(400).send("Insufficient balance to make this booking.");  
    }  

    // Deduct total cost from user's balance  
    user.coins -= totalCost;  
    await user.save(); // Save updated user balance  

    // Create the booking  
    const booking = await Booking.create({
      parkingLotId,  
      vehicleId,  
      userId,  
      startTime: start,  
      endTime: end,  
      duration: durationInHours,  
      totalCost: totalCost,  
    });  

    // Save the updated parking lot with reduced spots  
    await parkingLot.save();  

    // Prepare the email content  
    const mailOptions = {  
      from: process.env.EMAIL_USER,  
      to: user.email, // User's email  
      subject: "Your Parking Ticket",  
      text:   
        `Here are your parking ticket details:\n\n` +  
        `Parking Lot ID: ${parkingLotId}\n` +  
        `Vehicle Type: ${vehicleType}\n` +  
        `Booking Start Time: ${start.toString()}\n` +  
        `Booking End Time: ${end.toString()}\n` +  
        `Total Duration: ${durationInHours} hours\n` +  
        `Total Cost: $${totalCost.toFixed(2)}\n\n` +  
        `Thank you for choosing us!`  
    };  

    // Send the email  
    await transporter.sendMail(mailOptions); // Correctly using sendMail  

    // Redirect to the ticket generation route with the booking ID  
    res.redirect(`/ticket/${booking.id}`);  
  } catch (error) {  
    console.error("Error creating booking:", error);  
    res.status(500).send("An error occurred while processing your booking.");  
  }  
};