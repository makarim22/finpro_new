'use strict';  

module.exports = {  
  up: async (queryInterface, Sequelize) => {  
    await queryInterface.createTable('bookings', {  
      id: {  
        type: Sequelize.INTEGER,  
        autoIncrement: true,  
        primaryKey: true,  
        allowNull: false,  
      },  
      parkingLotId: {  
        type: Sequelize.INTEGER,  
        allowNull: false,  
        references: {  
          model: 'parking_lots', // Assuming the ParkingLot table is named 'parking_lots'  
          key: 'id',  
        },  
        onUpdate: 'CASCADE',  
        onDelete: 'SET NULL', // Handle deletion (consider using CASCADE based on your requirements)  
      },  
      vehicleId: {  
        type: Sequelize.INTEGER,  
        allowNull: false,  
      },  
      userId: {  
        type: Sequelize.INTEGER,  
        allowNull: false,  
        references: {  
          model: 'users', // Assuming the User table is named 'users'  
          key: 'id',  
        },  
        onUpdate: 'CASCADE',  
        onDelete: 'SET NULL', // Handle deletion (consider using CASCADE based on your requirements)  
      },  
      startTime: {  
        type: Sequelize.DATE,  
        allowNull: false,  
      },  
      endTime: {  
        type: Sequelize.DATE,  
        allowNull: false,  
      },  
      totalCost: {  
        type: Sequelize.FLOAT,  
        allowNull: false,  
      },  
      duration: { // New field for duration  
        type: Sequelize.FLOAT,  
        allowNull: true,  
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
    await queryInterface.dropTable('bookings');  
  }  
};