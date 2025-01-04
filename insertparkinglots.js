const { Client } = require('pg');  

// Set up the PostgreSQL client  
const client = new Client({  
    user: 'postgres', // Your PostgreSQL username  
    host: 'localhost',      // Your host, usually 'localhost'  
    database: 'parking-app3', // Your database name  
    password: 'P4ssword', // Your PostgreSQL password  
    port: 5432,              // Your PostgreSQL port, default is 5432  
});  

// Function to insert parking lot records  
async function insertParkingLots() {  
    await client.connect();  

    const parkingLots = [  
        {  
            id: 6,  
            name: 'Parkir Senayan',  
            address: 'Jl. Jend. Sudirman No.1, Senayan, Jakarta',  
            latitude: -6.227,  
            longitude: 106.801,  
            motorcycle_tariff: 3000,  
            car_tariff: 9000,  
            motorcycleCapacity: 55,  
            carCapacity: 110,  
            motorcycleAvailableSpot: 25,  
            carAvailableSpot: 85,  
        },  
        {  
            id: 7,  
            name: 'Parkir Thamrin',  
            address: 'Jl. M.H. Thamrin No.1, Jakarta',  
            latitude: -6.196,  
            longitude: 106.823,  
            motorcycle_tariff: 3200,  
            car_tariff: 10000,  
            motorcycleCapacity: 35,  
            carCapacity: 65,  
            motorcycleAvailableSpot: 15,  
            carAvailableSpot: 55,  
        },  
        {  
            id: 8,  
            name: 'Parkir Kuningan',  
            address: 'Jl. Kuningan No.19, Jakarta',  
            latitude: -6.226,  
            longitude: 106.846,  
            motorcycle_tariff: 2500,  
            car_tariff: 9000,  
            motorcycleCapacity: 40,  
            carCapacity: 70,  
            motorcycleAvailableSpot: 15,  
            carAvailableSpot: 55,  
        },  
        {  
            id: 9,  
            name: 'Parkir Sudirman',  
            address: 'Jl. Jend. Sudirman No.12, Jakarta',  
            latitude: -6.217,  
            longitude: 106.834,  
            motorcycle_tariff: 1500,  
            car_tariff: 7000,  
            motorcycleCapacity: 20,  
            carCapacity: 80,  
            motorcycleAvailableSpot: 5,  
            carAvailableSpot: 60,  
        },  
        {  
            id: 10,  
            name: 'Parkir Glodok',  
            address: 'Jl. Glodok No.1, Jakarta',  
            latitude: -6.139,  
            longitude: 106.799,  
            motorcycle_tariff: 2000,  
            car_tariff: 6000,  
            motorcycleCapacity: 25,  
            carCapacity: 40,  
            motorcycleAvailableSpot: 10,  
            carAvailableSpot: 30,  
        },  
        {  
            id: 11,  
            name: 'Parkir Manggarai',  
            address: 'Jl. Manggarai No.4, Jakarta',  
            latitude: -6.203,  
            longitude: 106.849,  
            motorcycle_tariff: 2200,  
            car_tariff: 8500,  
            motorcycleCapacity: 45,  
            carCapacity: 90,  
            motorcycleAvailableSpot: 25,  
            carAvailableSpot: 70,  
        },  
        {  
            id: 12,  
            name: 'Parkir Kemang',  
            address: 'Jl. Kemang Raya No.6, Jakarta',  
            latitude: -6.288,  
            longitude: 106.790,  
            motorcycle_tariff: 1800,  
            car_tariff: 7500,  
            motorcycleCapacity: 40,  
            carCapacity: 85,  
            motorcycleAvailableSpot: 30,  
            carAvailableSpot: 60,  
        },  
        {  
            id: 13,  
            name: 'Parkir Tebet',  
            address: 'Jl. Tebet Utara No.15, Jakarta',  
            latitude: -6.245,  
            longitude: 106.857,  
            motorcycle_tariff: 1200,  
            car_tariff: 5000,  
            motorcycleCapacity: 35,  
            carCapacity: 75,  
            motorcycleAvailableSpot: 35,  
            carAvailableSpot: 70,  
        },  
        {  
            id: 14,  
            name: 'Parkir Plaza Senayan',  
            address: 'Jl. Asia Afrika No.8, Jakarta',  
            latitude: -6.21,  
            longitude: 106.798,  
            motorcycle_tariff: 2500,  
            car_tariff: 9500,  
            motorcycleCapacity: 40,  
            carCapacity: 120,  
            motorcycleAvailableSpot: 30,  
            carAvailableSpot: 75,  
        },  
        {  
            id: 15,  
            name: 'Parkir Lippo Mall Puri',  
            address: 'Jl. Puri Agung No.1, Jakarta',  
            latitude: -6.202,  
            longitude: 106.726,  
            motorcycle_tariff: 3000,  
            car_tariff: 10000,  
            motorcycleCapacity: 50,  
            carCapacity: 130,  
            motorcycleAvailableSpot: 20,  
            carAvailableSpot: 90,  
        },  
    ];  

    try {  
        for (const lot of parkingLots) {  
            await client.query(  
                `INSERT INTO parking_lots (id, name, address, latitude, longitude, motorcycle_tariff, car_tariff, "motorcycleCapacity", "carCapacity", "motorcycleAvailableSpot", "carAvailableSpot", "createdAt", "updatedAt")  
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())  
                ON CONFLICT (id)   
                DO UPDATE SET   
                    name = EXCLUDED.name,  
                    address = EXCLUDED.address,  
                    latitude = EXCLUDED.latitude,  
                    longitude = EXCLUDED.longitude,  
                    motorcycle_tariff = EXCLUDED.motorcycle_tariff,  
                    car_tariff = EXCLUDED.car_tariff,  
                    "motorcycleCapacity" = EXCLUDED."motorcycleCapacity",  
                    "carCapacity" = EXCLUDED."carCapacity",  
                    "motorcycleAvailableSpot" = EXCLUDED."motorcycleAvailableSpot",  
                    "carAvailableSpot" = EXCLUDED."carAvailableSpot",  
                    "updatedAt" = NOW()`,  
                [  
                    lot.id,  
                    lot.name,  
                    lot.address,  
                    lot.latitude,  
                    lot.longitude,  
                    lot.motorcycle_tariff,  
                    lot.car_tariff,  
                    lot.motorcycleCapacity,  
                    lot.carCapacity,  
                    lot.motorcycleAvailableSpot,  
                    lot.carAvailableSpot,  
                ]  
            );  
        }  
        console.log('Data inserted/updated successfully.');  
    } catch (error) {  
        console.error('Error inserting data:', error);  
    } finally {  
        await client.end();  
    }  
}  

// Execute the function to insert data  
insertParkingLots();