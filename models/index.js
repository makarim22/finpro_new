'use strict';  

const fs = require('fs');  
const path = require('path');  
const Sequelize = require('sequelize');  
const process = require('process');  
const sequelize = require('../config/database'); // Import the Sequelize instance  
const db = {}; // Create an object to hold your models  

// Load all models from the models directory  
fs  
    .readdirSync(__dirname)  
    .filter(file => {  
        return (  
            file.indexOf('.') !== 0 &&  
            file !== 'index.js' && // Exclude the index file  
            file.slice(-3) === '.js' // Select only .js files  
        );  
    })  
    .forEach(file => {  
        const model = require(path.join(__dirname, file)); // Import the model  
        db[model.name] = model; // Add model to db object  
    });  

// Initialize all models  
Object.keys(db).forEach(modelName => {  
    if (db[modelName].init) {  
        db[modelName].init(sequelize, Sequelize.DataTypes); // Initialize the model with Sequelize instance  
    }  
});  

// Define associations  
Object.keys(db).forEach(modelName => {  
    if (db[modelName].associate) {  
        db[modelName].associate(db); // Call associate method if it exists  
    }  
});  

// Attach Sequelize instance to db  
db.sequelize = sequelize;  
db.Sequelize = Sequelize;  

// Export the db object containing all models and the sequelize instance  
module.exports = db;