// associations.js  
const User = require('./models/User');  
const Booking = require('./models/Booking');  
const ParkingLot = require('./models/ParkingLot');  

// User to Booking  
User.hasMany(Booking, { foreignKey: 'userId', sourceKey: 'id' });  
Booking.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });  

// Booking to ParkingLot  
Booking.belongsTo(ParkingLot, { foreignKey: 'parkingLotId', targetKey: 'id' });  
ParkingLot.hasMany(Booking, { foreignKey: 'parkingLotId', sourceKey: 'id' });