// models/Role.js  
const { DataTypes } = require('sequelize');  
const sequelize = require('../config/database');  

const Role = sequelize.define('Role', {  
     id: { // Explicitly define the ID field  
      type: DataTypes.INTEGER,  
      autoIncrement: true,  
      primaryKey: true,  
      allowNull: false,  
    }, 
    role: {  
        type: DataTypes.ENUM('superadmin', 'admin', 'user'), // Define ENUM for roles  
        allowNull: false,  
      }
}, {  
    tableName: 'roles',  
    timestamps: false  
});  

module.exports = Role;  