const { Model, DataTypes } = require("sequelize");  
const sequelize = require("../config/database");  

class Role extends Model {  
  static associate(models) {  
    Role.hasMany(models.User, { foreignKey: 'roleId' }); // Association with User model  
  }  
}  

// Initialize the Role model  
Role.init(  
  {  
    id: { // Explicitly define the ID field  
      type: DataTypes.INTEGER,  
      autoIncrement: true,  
      primaryKey: true,  
      allowNull: false,  
    },  
    role: {  
      type: DataTypes.ENUM('superadmin', 'admin', 'user'), // Define ENUM for roles  
      allowNull: false,  
    },  
  },  
  {  
    sequelize, // Pass the sequelize instance  
    modelName: "Role", // Name of the model  
    tableName: "roles", // Name of the corresponding table  
    timestamps: true, // Automatically adds createdAt and updatedAt fields  
  }  
);  

module.exports = Role;