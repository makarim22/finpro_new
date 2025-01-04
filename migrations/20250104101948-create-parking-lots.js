'use strict';  

module.exports = {  
    up: async (queryInterface, Sequelize) => {  
        await queryInterface.createTable('parking_lots', {  
            id: {  
                type: Sequelize.INTEGER,  
                primaryKey: true,  
                autoIncrement: true,  
            },  
            name: {  
                type: Sequelize.STRING,  
                allowNull: false,  
            },  
            address: {  
                type: Sequelize.STRING,  
                allowNull: false,  
            },  
            latitude: {  
                type: Sequelize.FLOAT,  
                allowNull: false,  
            },  
            longitude: {  
                type: Sequelize.FLOAT,  
                allowNull: false,  
            },  
            motorcycle_tariff: {  
                type: Sequelize.FLOAT,  
                allowNull: false,  
            },  
            car_tariff: {  
                type: Sequelize.FLOAT,  
                allowNull: false,  
            },  
            motorcycleCapacity: {  
                type: Sequelize.INTEGER,  
                allowNull: false,  
            },  
            carCapacity: {  
                type: Sequelize.INTEGER,  
                allowNull: false,  
            },  
            motorcycleAvailableSpot: {  
                type: Sequelize.INTEGER,  
                allowNull: false,  
            },  
            carAvailableSpot: {  
                type: Sequelize.INTEGER,  
                allowNull: false,  
            },  
            createdAt: {  
                type: Sequelize.DATE,  
                allowNull: false,  
                defaultValue: Sequelize.fn('NOW'),  
            },  
            updatedAt: {  
                type: Sequelize.DATE,  
                allowNull: false,  
                defaultValue: Sequelize.fn('NOW'),  
            },  
        });  
    },  

    down: async (queryInterface, Sequelize) => {  
        await queryInterface.dropTable('parking_lots');  
    }  
};