const sequelize = require('./config/database');  
const User = require('./models/User');  
const Vehicle = require('./models/Vehicle');  
const ParkingLot = require('./models/ParkingLot');  
const Reservation = require('./models/Reservation');  

const syncDatabase = async () => {  
    try {  
        await sequelize.authenticate(); // Test the connection  
        console.log('Connection has been established successfully.');  

        await sequelize.sync({ force: true }); // Sync all models (force: true will drop the table if it exists)  
        console.log('Database & tables created!');  

    } catch (error) {  
        console.error('Unable to connect to the database:', error);  
    } finally {  
        await sequelize.close(); // Close the connection  
    }  
};  

syncDatabase();