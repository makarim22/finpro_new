const { DataTypes } = require('sequelize');  
const sequelize = require('../config/database');  

const Vehicle = sequelize.define('Vehicle', {  
    userId: {  
        type: DataTypes.INTEGER,  
        allowNull: false,  
        references: {  
            model: 'users',  
            key: 'id',  
        },  
    },  
    licensePlate: {  
        type: DataTypes.STRING,  
        allowNull: false,  
    },  
    model: {  
        type: DataTypes.STRING,  
        allowNull: false,  
    },  
    color: {  
        type: DataTypes.STRING,  
        allowNull: false,  
    },  
}, {  
    tableName: 'vehicles',  
    timestamps: true,  
});  

module.exports = Vehicle;