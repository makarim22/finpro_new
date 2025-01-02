'use strict';  

module.exports = {  
  up: async (queryInterface, Sequelize) => {  
    await queryInterface.addColumn('users', 'roleId', {  
      type: Sequelize.INTEGER,  
      allowNull: false,  
      references: {  
        model: 'roles', // References the Role model  
        key: 'id',  
      },  
    });  
  },  

  down: async (queryInterface, Sequelize) => {  
    await queryInterface.removeColumn('users', 'roleId');  
  }  
};