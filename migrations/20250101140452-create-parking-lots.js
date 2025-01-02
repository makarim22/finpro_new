'use strict';  

module.exports = {  
  up: async (queryInterface, Sequelize) => {  
    await queryInterface.createTable('parking_lots', {  
      id: {  
        type: Sequelize.INTEGER,  
        autoIncrement: true,  
        primaryKey: true,  
        allowNull: false,  
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
        type: Sequelize.FLOAT, // Assuming tariff can be a decimal value  
        allowNull: false,  
      },  
      car_tariff: {  
        type: Sequelize.FLOAT, // Assuming tariff can be a decimal value  
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
        defaultValue: Sequelize.fn('NOW'), // Correct way to set the default value  
      },  
      updatedAt: {  
        type: Sequelize.DATE,  
        allowNull: false,  
        defaultValue: Sequelize.fn('NOW'), // Set current timestamp  
      },  
    });  
  },  

  down: async (queryInterface, Sequelize) => {  
    await queryInterface.dropTable('parking_lots');  
  }  
};