const { Model, DataTypes } = require('sequelize');  
const sequelize = require('../config/database');  

class ParkingLot extends Model {  
    static associate(models) {  
        // A ParkingLot can have many bookings  
        ParkingLot.hasMany(models.Booking, {  
            foreignKey: 'parkingLotId', // this should match the Booking model's foreign key field  
            as: 'bookings'  
        });  
    }  
}  


// Initialize the ParkingLot model with the updated attributes  
ParkingLot.init({  
    id: { // Change from parkingLotId to id  
        type: DataTypes.INTEGER,  
        primaryKey: true,  
        autoIncrement: true,  
    },  
    name: {  
        type: DataTypes.STRING,  
        allowNull: false,  
    },  
    address: {  
        type: DataTypes.STRING,  
        allowNull: false,  
    },  
    latitude: {  
        type: DataTypes.FLOAT,  
        allowNull: false,  
    },  
    longitude: {  
        type: DataTypes.FLOAT,  
        allowNull: false,  
    },  
    motorcycle_tariff: {  
        type: DataTypes.FLOAT,  // Assuming tariff could be a decimal value  
        allowNull: false,  
    },  
    car_tariff: {  
        type: DataTypes.FLOAT,  // Assuming tariff could be a decimal value  
        allowNull: false,  
    },  
    motorcycleCapacity: {  
        type: DataTypes.INTEGER,  
        allowNull: false,  
    },  
    carCapacity: {  
        type: DataTypes.INTEGER,  
        allowNull: false,  
    },  
    motorcycleAvailableSpot: {  
        type: DataTypes.INTEGER,  
        allowNull: false,  
    },  
    carAvailableSpot: {  
        type: DataTypes.INTEGER,  
        allowNull: false,  
    },  
}, {  
    sequelize,  
    modelName: 'ParkingLot', // Prefer camel case for modelName  
    tableName: 'parking_lots', // Explicitly name the database table  
    timestamps: true, // Automatically add createdAt and updatedAt fields  
});  

module.exports = ParkingLot;