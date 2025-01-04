// controllers/authController2.js  
const bcrypt = require('bcrypt');  
const sequelize = require('../config/database');  
const jwt = require('jsonwebtoken'); 
const JWT_SECRET = 'your_jwt_secret';
exports.register = async (req, res) => {  
    const { username, password, email, role } = req.body;  

    // Validate input  
    if (!username || !password || !email || !role) {  
        return res.render('register', { error: 'All fields are required.' });  
    }  

    // Check if the user already exists  
    const [existingUser] = await sequelize.query(`  
        SELECT * FROM users WHERE username = :username  
    `, {  
        replacements: { username },  
        type: sequelize.QueryTypes.SELECT  
    });  

    if (existingUser) {  
        return res.render('register', { error: 'Username already exists' });  
    }  

    // Map role to roleId  
    let roleId;  
    switch (role) {  
        case 'user':  
            roleId = 1;  
            break;  
        case 'admin':  
            roleId = 2;  
            break;  
        case 'superadmin':  
            roleId = 3;  
            break;  
        default:  
            return res.render('register', { error: 'Invalid role selected' });  
    }  

    // Hash the password  
    const hashedPassword = await bcrypt.hash(password, 10);  
    const currentTimestamp = new Date(); // Get the current timestamp  

try {  
    await sequelize.query(`  
        INSERT INTO users (username, password, email, "roleId", "createdAt", "updatedAt")   
        VALUES (:username, :password, :email, :roleId, :createdAt, :updatedAt)  
    `, {  
        replacements: {  
            username,  
            password: hashedPassword,  
            email,  
            roleId,  
            createdAt: currentTimestamp,  
            updatedAt: currentTimestamp // Set both createdAt and updatedAt to current timestamp  
        },  
        type: sequelize.QueryTypes.INSERT  
    });  

        res.redirect('/login'); // Redirect to login after successful registration  
    } catch (error) {  
        console.error('Error creating user:', error);  
        res.render('register', { error: 'Registration failed. Please try again.' });  
    }  
};  
// exports.login = async (req, res) => {  
//     const { username, password } = req.body;  

//     try {  
//         // Use raw SQL to find the user by username and get the role  
//         const [user] = await sequelize.query(`  
//             SELECT u.id, u.username, u.password, r.role AS role_name  
//             FROM users u  
//             JOIN roles r ON u."roleId" = r.id  
//             WHERE u.username = :username  
//         `, {  
//             replacements: { username },  
//             type: sequelize.QueryTypes.SELECT,  
//         });  

//         // Check if user exists and password is correct  
//         if (user && await bcrypt.compare(password, user.password)) {  
//             // User authentication successful  
//             req.session.userId = user.id; // Save user ID in session  
//             req.session.role = user.role_name; // Save user role in session  

//             // Redirect based on user role  
//             if (user.role_name === 'admin') {  
//                 return res.redirect('admin/dashboard');  
//             } else if (user.role_name === 'superadmin') {  
//                 return res.redirect('admin/dashboard');  
//             } else {  
//                 return res.redirect('user/dashboard');  
//             }  
//         } else {  
//             // Invalid username or password  
//             res.status(401).send('Invalid credentials');  
//         }  
//     } catch (error) {  
//         console.error('Login Error:', error);  
//         res.status(500).send('Server error');  
//     }  
// };  
// Ensure this path is correct  

// exports.login = async (req, res) => {  
//     const { username, password } = req.body;  

//     try {  
//         // Use raw SQL to find the user by username and get the role  
//         const [user] = await sequelize.query(`  
//             SELECT u.id, u.username, u.password, r.role AS role_name  
//             FROM users u  
//             JOIN roles r ON u."roleId" = r.id  
//             WHERE u.username = :username  
//         `, {  
//             replacements: { username },  
//             type: sequelize.QueryTypes.SELECT,  
//         });  

//         // Check if user exists and password is correct  
//         if (user && await bcrypt.compare(password, user.password)) {  
//             // User authentication successful  
//             // Generate JWT token using secret from environment variable  
//             const token = jwt.sign({ id: user.id, role: user.role_name }, process.env.JWT_SECRET, {  
//                 expiresIn: '1h', // Token expiry time  
//             });  

//             // Send the token back to the client  
//             return res.json({  
//                 message: 'Login successful',  
//                 token,  
//                 user: {  
//                     id: user.id,  
//                     username: user.username,  
//                     role: user.role_name,  
//                 },  
//             });  
//         } else {  
//             // Invalid username or password  
//             return res.status(401).send('Invalid credentials');  
//         }  
//     } catch (error) {  
//         console.error('Login Error:', error);  
//         return res.status(500).send('Server error');  
//     }  
// };

// 


// exports.login = async (req, res) => {  
//     const { username, password } = req.body;  

//     try {  
//         // Use raw SQL to find the user by username and get the role  
//         const [user] = await sequelize.query(`  
//             SELECT u.id, u.username, u.password, r.role AS role_name  
//             FROM users u  
//             JOIN roles r ON u."roleId" = r.id  
//             WHERE u.username = :username  
//         `, {  
//             replacements: { username },  
//             type: sequelize.QueryTypes.SELECT,  
//         });  

//         // Check if user exists and password is correct  
//         if (user && await bcrypt.compare(password, user.password)) {  
//             // User authentication successful  
//             const token = jwt.sign({ id: user.id, role: user.role_name }, process.env.JWT_SECRET, {  
//                 expiresIn: '1h', // Token expiry time  
//             });  

//             // Set the token in a cookie  
//             res.cookie('token', token, {  
//                 httpOnly: true, // Prevent client-side access to the cookie  
//                 secure: process.env.NODE_ENV === 'production', // Use secure cookies in production  
//                 maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour)  
//             });  

//             // Redirect based on user role  
//             if (user.role_name === 'admin' || user.role_name === 'superadmin') {  
//                 return res.redirect('/admin/dashboard');  
//             } else {  
//                 return res.redirect('/user/dashboard');  
//             }  
//         } else {  
//             return res.status(401).send('Invalid credentials');  
//         }  
//     } catch (error) {  
//         console.error('Login Error:', error);  
//         return res.status(500).send('Server error');  
//     }  
// };
exports.login = async (req, res) => {  
    const { username, password } = req.body;  

    try {  
        // Use raw SQL to find the user by username and get the role  
        const [user] = await sequelize.query(`  
            SELECT u.id, u.username, u.password, r.role AS role_name  
            FROM users u  
            JOIN roles r ON u."roleId" = r.id  
            WHERE u.username = :username  
        `, {  
            replacements: { username },  
            type: sequelize.QueryTypes.SELECT,  
        });  

        // Check if user exists and password is correct  
        if (user && await bcrypt.compare(password, user.password)) {  
            // User authentication successful  
            const token = jwt.sign({   
                id: user.id,   
                role: user.role_name,   
                username: user.username // Add the username to the token payload  
            }, process.env.JWT_SECRET, {  
                expiresIn: '1h', // Token expiry time  
            });  

            // Set the token in a cookie  
            res.cookie('token', token, {  
                httpOnly: true, // Prevent client-side access to the cookie  
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production  
                maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour)  
            });  

            // Redirect based on user role  
            if (user.role_name === 'admin' || user.role_name === 'superadmin') {  
                return res.redirect('/admin/dashboard');  
            } else {  
                return res.redirect('/user/dashboard');  
            }  
        } else {  
            return res.status(401).send('Invalid credentials');  
        }  
    } catch (error) {  
        console.error('Login Error:', error);  
        return res.status(500).send('Server error');  
    }  
};
exports.showLoginForm = (req, res) => {  
    res.render('login',{ error: null }); // Render login view  
};

exports.logout = async (req, res) => {  
    try {  
        // Check if the user is authenticated by checking for userId from JWT  
        const userId = req.userId; // Assuming userId is set during JWT authentication  

        if (userId) {  
            // If using session storage, destroy the session  
            req.session.destroy((err) => {  
                if (err) {  
                    return res.status(500).json({ message: 'Could not log out, please try again.' });  
                }  
                // Clear the token cookie  
                res.clearCookie('token'); // Assuming your token is stored in a cookie named 'token'  
                // Redirect to the login page or home page after logout  
                return res.redirect('/login');  
            });  
        } else {  
            // Handle logout for token-based authentication  
            const token = req.cookies.token; // Retrieve the token from cookies  

            if (token) {  
                // Clear the token cookie  
                res.clearCookie('token'); // Clear the cookie to log out the user  
                // return res.json({ message: 'Logged out successfully. Please refresh the page.' });  
                return res.redirect ('login')
            } else {  
                // If already logged out or not authenticated  
                return res.status(400).json({ message: 'No user is logged in.' });  
            }  
        }  
    } catch (error) {  
        console.error('Logout error:', error);  
        return res.status(500).json({ message: 'An error occurred during logout.' });  
    }  
};

// exports.logout = async (req, res) => {  
//     try {  
//         // Check if the user is authenticated  
//         if (req.session.userId) {  
//             // If using session storage, destroy the session  
//             req.session.destroy((err) => {  
//                 if (err) {  
//                     return res.status(500).json({ message: 'Could not log out, please try again.' });  
//                 }  
//                 // Redirect to the login page or home page after logout  
//                 return res.redirect('/login');  
//             });  
//         } else {  
//             // If not using sessions (e.g., for token-based logouts)  
//             const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is sent in the Authorization header  

//             if (token) {  
//                 // In a JWT scenario, you usually handle token invalidation on the client-side  
//                 return res.json({ message: 'Logged out successfully. Please clear your token from client storage.' });  
//             } else {  
//                 // If already logged out or not authenticated  
//                 return res.status(400).json({ message: 'No user is logged in.' });  
//             }  
//         }  
//     } catch (error) {  
//         console.error('Logout error:', error);  
//         return res.status(500).json({ message: 'An error occurred during logout.' });  
//     }  
// };