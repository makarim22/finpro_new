const sequelize = require('./config/database'); // adjust the path according to your project structure  
const User = require('./models/User'); // adjust the path according to your project structure  

const giveCoinsToUsers = async () => {  
    try {  
        const coinsToGive = 100; // Amount of coins to assign  
       
        // Synchronize database  
        await sequelize.sync();  

        // Update all users' coins  
        await User.update(  
            { coins: sequelize.Sequelize.literal(`coins + ${coinsToGive}`) },  
            { where: {} } // This will affect all users  
        );  

        console.log(`Successfully given ${coinsToGive} coins to all users.`);  
    } catch (error) {  
        console.error('Error updating user coins:', error);  
    } finally {  
        await sequelize.close();  
    }  
};  

giveCoinsToUsers();