const sequelize = require('./config/database');  
const ParkingLot = require('./models/ParkingLot');  

const populateParkingLots = async () => {  
    try {  
        await sequelize.authenticate(); // Test the connection  
        console.log('Connection has been established successfully.');  

        // Dummy parking lot data for Bandung, West Java  
        const parkingLots = [  
            {  
                name: 'Bandung City Center Parking Lot',  
                address: 'Jl. Merdeka No. 1, Bandung, West Java',  
                totalSpots: 50,  
                availableSpots: 20,  
                latitude: -6.917464,  
                longitude: 107.619123,  
            },  
            {  
                name: 'Bandung Airport Parking Garage',  
                address: 'Jl. Soekarno-Hatta No. 1, Bandung, West Java',  
                totalSpots: 100,  
                availableSpots: 50,  
                latitude: -6.903889,  
                longitude: 107.576389,  
            },  
            {  
                name: 'Trans Studio Bandung Parking',  
                address: 'Jl. Gatot Subroto No. 289, Bandung, West Java',  
                totalSpots: 200,  
                availableSpots: 150,  
                latitude: -6.934444,  
                longitude: 107.610278,  
            },  
            {  
                name: 'Universitas Padjadjaran Parking Lot',  
                address: 'Jl. Raya Bandung-Sumedang No. 1, Bandung, West Java',  
                totalSpots: 75,  
                availableSpots: 30,  
                latitude: -6.889444,  
                longitude: 107.610278,  
            },  
            {  
                name: 'Cihampelas Walk Parking Lot',  
                address: 'Jl. Cihampelas No. 160, Bandung, West Java',  
                totalSpots: 150,  
                availableSpots: 100,  
                latitude: -6.895000,  
                longitude: 107.598611,  
            },  
        ];  

        // Insert dummy data into the parking_lots table  
        await ParkingLot.bulkCreate(parkingLots);  
        console.log('Dummy parking lots have been added successfully.');  

    } catch (error) {  
        console.error('Unable to connect to the database or insert data:', error);  
    } finally {  
        await sequelize.close(); // Close the connection  
    }  
};  

populateParkingLots();