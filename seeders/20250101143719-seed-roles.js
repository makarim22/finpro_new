'use strict';  

module.exports = {  
  up: async (queryInterface, Sequelize) => {  
    await queryInterface.bulkInsert('roles', [  
      { role: 'user', createdAt: new Date(), updatedAt: new Date() },  
      { role: 'admin', createdAt: new Date(), updatedAt: new Date() },  
      { role: 'superadmin', createdAt: new Date(), updatedAt: new Date() },  
    ], {});  
  },  

  down: async (queryInterface, Sequelize) => {  
    await queryInterface.bulkDelete('roles', null, {});  
  }  
};