
const Booking = require('../models/Booking');
const ParkingLot = require('../models/ParkingLot');
// Admin function to get total revenue per parking lot  
exports.getTotalRevenuePerParkingLot = async (req, res) => {  
    try {  
        const revenueData = await ParkingLot.findAll({  
            attributes: {  
                include: [  
                    // Calculate total revenue for each parking lot  
                    [sequelize.fn('SUM', sequelize.col('Bookings.totalCost')), 'totalRevenue'],  
                ],  
            },  
            include: [  
                {  
                    model: Booking,  
                    attributes: [],  
                },  
            ],  
            group: ['ParkingLot.id'], // Grouping by Parking Lot ID  
        });  

        // Render the admin revenue view with revenue data  
        res.render('admin/revenue', { revenueData });  
    } catch (error) {  
        console.error('Error fetching total revenue:', error);  
        res.status(500).send('An error occurred while retrieving revenue data.');  
    }  
};