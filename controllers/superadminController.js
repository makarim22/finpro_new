// controllers/superadminController.js  
const sequelize = require('../config/database'); // Adjust based on your setup  

// exports.getSuperadminPage = async (req, res) => {  
//     try {  
//         // Fetch all users and admins  
//         const users = await sequelize.query(`  
//             SELECT * FROM users  
//         `, {  
//             type: sequelize.QueryTypes.SELECT  
//         });  

//         // Render Superadmin page with user data  
//         return res.render('superadmin/superadmin', { users });  
//     } catch (error) {  
//         console.error('Error fetching users:', error);  
//         return res.render('error', { message: 'Unable to load users.', error: error.message });  
//     }  
// };  

// Handle delete user/admin  

//
// controllers/superadminController.js   

exports.getSuperadminPage = async (req, res, next) => {  
    try {  
        // Fetch all users and admins  
        const users = await sequelize.query(`  
            SELECT u.id, u.username, r.role FROM users u
            join roles r on u."roleId" = r.id
        `, {  
            type: sequelize.QueryTypes.SELECT  
        });  

        // Render Superadmin page with user data  
        return res.render('admin/superadmin', { users });  
    } catch (error) {  
        console.error('Error fetching users:', error);  

        // Pass the error to the next middleware (error handler)  
        return next({  
            message: 'Unable to load users.',  
            error: error.message  
        });  
    }  
};
//
// controllers/superadminController.js  
// controllers/superadminController.js  
exports.deleteUserAdmin = async (req, res, next) => {  
    console.log('Delete route hit');  // Debugging line  
    const { id } = req.params; // Get user or admin ID from params  
    try {  
        // Delete the user or admin record  
        await sequelize.query(`  
            DELETE FROM users WHERE id = :id  
        `, {  
            replacements: { id },  
            type: sequelize.QueryTypes.DELETE  
        });  
        return res.redirect('/superadmin'); // Redirect back to superadmin page after deletion  
    } catch (error) {  
        console.error('Error deleting user/admin:', error);  
        return next({  
            message: 'Unable to delete user/admin.',  
            error: error.message  
        });  
    }  
};