// In a separate file like initModels.js or in your main server.js/app.js  
const { sequelize } = require("./config/database");  
const User = require("./models/User");  
const Booking = require("./models/Booking");  
const ParkingLot = require("./models/ParkingLot");  

// Define associations after all models are imported  
User.associate({ Booking });  
Booking.associate({ User, ParkingLot });  
ParkingLot.associate({ Booking });  

// Sync models  
const syncModels = async () => {  
    try {  
        await sequelize.sync(); // or sequelize.sync({ force: true }) for dev  
        console.log("Database models have been synced.");  
    } catch (error) {  
        console.error("Error syncing database models:", error);  
    }  
};  

module.exports = syncModels;