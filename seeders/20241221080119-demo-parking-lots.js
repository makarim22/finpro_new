'use strict';  

const parkingLotsData = [  
    {  
        id: 1,  
        name: "Bandung City Center Parking Lot",  
        address: "Jl. Merdeka No. 1, Bandung, West Java",  // Changed from location to address  
        motorcycleCapacity: 50,  
        carCapacity: 20,  
        motorcycleAvailableSpot: 50,  
        carAvailableSpot: 20,  
        motorcycle_tariff: 2.00,  
        car_tariff: 5.00,  
        latitude: -6.917464,  
        longitude: 107.619123,  
        createdAt: new Date(),  
        updatedAt: new Date(),  
    },  
    {  
        id: 2,  
        name: "Bandung Airport Parking Garage",  
        address: "Jl. Soekarno-Hatta No. 1, Bandung, West Java",  // Changed from location to address  
        motorcycleCapacity: 100,  
        carCapacity: 50,  
        motorcycleAvailableSpot: 100,  
        carAvailableSpot: 50,  
        motorcycle_tariff: 2.50,  
        car_tariff: 6.00,  
        latitude: -6.903889,  
        longitude: 107.576389,  
        createdAt: new Date(),  
        updatedAt: new Date(),  
    },  
    {  
        id: 3,  
        name: "Trans Studio Bandung Parking",  
        address: "Jl. Gatot Subroto No. 289, Bandung, West Java",  // Changed from location to address  
        motorcycleCapacity: 200,  
        carCapacity: 150,  
        motorcycleAvailableSpot: 200,  
        carAvailableSpot: 150,  
        motorcycle_tariff: 3.00,  
        car_tariff: 7.00,  
        latitude: -6.934444,  
        longitude: 107.610278,  
        createdAt: new Date(),  
        updatedAt: new Date(),  
    },  
    {  
        id: 4,  
        name: "Universitas Padjadjaran Parking Lot",  
        address: "Jl. Raya Bandung-Sumedang No. 1, Bandung, West Java",  // Changed from location to address  
        motorcycleCapacity: 75,  
        carCapacity: 30,  
        motorcycleAvailableSpot: 75,  
        carAvailableSpot: 30,  
        motorcycle_tariff: 2.00,  
        car_tariff: 5.00,  
        latitude: -6.889444,  
        longitude: 107.610278,  
        createdAt: new Date(),  
        updatedAt: new Date(),  
    },  
    {  
        id: 5,  
        name: "Cihampelas Walk Parking Lot",  
        address: "Jl. Cihampelas No. 160, Bandung, West Java",  // Changed from location to address  
        motorcycleCapacity: 150,  
        carCapacity: 100,  
        motorcycleAvailableSpot: 150,  
        carAvailableSpot: 100,  
        motorcycle_tariff: 2.50,  
        car_tariff: 6.00,  
        latitude: -6.895000,  
        longitude: 107.598611,  
        createdAt: new Date(),  
        updatedAt: new Date(),  
    }  
];  

module.exports = {  
    up: async (queryInterface, Sequelize) => {  
        for (const parkingLot of parkingLotsData) {  
            const existingParkingLot = await queryInterface.rawSelect('parking_lots', {  
                where: { id: parkingLot.id }  
            }, ['id']);  

            if (existingParkingLot) {  
                // Update the existing record  
                await queryInterface.bulkUpdate(  
                    'parking_lots',  
                    parkingLot,  
                    { id: parkingLot.id }  
                );  
            } else {  
                // Insert new record if it does not exist  
                await queryInterface.bulkInsert('parking_lots', [parkingLot]);  
            }  
        }  
    },  

    down: async (queryInterface, Sequelize) => {  
        await queryInterface.bulkDelete('parking_lots', null, {});  
    }  
};