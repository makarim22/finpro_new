'use strict';  

module.exports = {  
  up: async (queryInterface, Sequelize) => {  
    await queryInterface.createTable('users', {  
      id: {  
        type: Sequelize.INTEGER,  
        autoIncrement: true,  
        primaryKey: true,  
        allowNull: false,  
      },  
      username: {  
        type: Sequelize.STRING,  
        allowNull: false,  
        unique: true,  
      },  
      password: {  
        type: Sequelize.STRING,  
        allowNull: false,  
      },  
      email: {  
        type: Sequelize.STRING,  
        allowNull: false,  
        unique: true,  
      },  
      coins: {  
        type: Sequelize.INTEGER,  
        defaultValue: 100,  
        allowNull: true,  
      },  
      roleId: {  
        type: Sequelize.INTEGER,  
        references: {  
          model: 'roles',  
          key: 'id',  
        },  
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
    await queryInterface.dropTable('users');  
  }  
};