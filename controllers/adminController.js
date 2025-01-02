const { ParkingLot } = require('../models');  

exports.manageParkingLots = async (req, res) => {  
    try {  
        const parkingLots = await ParkingLot.findAll();  
        res.render('admin/manage-parking-lots', { parkingLots });  
    } catch (error) {  
        console.error('Error fetching parking lots:', error);  
        res.status(500).send('An error occurred while retrieving parking lots.');  
    }  
};  

exports.deductSpot = async (req, res) => {  
    const { parkingLotId, spotsToDeduct } = req.body;  
    try {  
        const parkingLot = await ParkingLot.findByPk(parkingLotId);  
        if (!parkingLot || (parkingLot.carAvailableSpot < spotsToDeduct)) {  
            return res.status(400).send('Cannot deduct spots, insufficient available spots.');  
        }  

        parkingLot.carAvailableSpot -= spotsToDeduct;  
        await parkingLot.save();  
        res.redirect('/admin/manage-parking-lots');  
    } catch (error) {  
        console.error('Error deducting parking spot:', error);  
        res.status(500).send('An error occurred while deducting the spot.');  
    }  
};  

exports.deductMotorcycleSpot = async (req, res) => {  
    const { parkingLotId, motorcycleSpotsToDeduct } = req.body;  
    try {  
        const parkingLot = await ParkingLot.findByPk(parkingLotId);  
        if (!parkingLot || (parkingLot.motorcycleAvailableSpot < motorcycleSpotsToDeduct)) {  
            return res.status(400).send('Cannot deduct motorcycle spots, insufficient available spots.');  
        }  

        parkingLot.motorcycleAvailableSpot -= motorcycleSpotsToDeduct;  
        await parkingLot.save();  
        res.redirect('/admin/manage-parking-lots');  
    } catch (error) {  
        console.error('Error deducting motorcycle parking spot:', error);  
        res.status(500).send('An error occurred while deducting the motorcycle spot.');  
    }  
};