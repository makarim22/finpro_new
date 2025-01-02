'use strict';  

module.exports = {  
  up: async (queryInterface, Sequelize) => {  
    await queryInterface.createTable('roles', {  
      id: {  
        type: Sequelize.INTEGER,  
        autoIncrement: true,  
        primaryKey: true,  
        allowNull: false,  
      },  
      role: {  
        type: Sequelize.ENUM('superadmin', 'admin', 'user'),  
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
    await queryInterface.dropTable('roles');  
  }  
};