// middleware/authmiddleware.js  

// const isAdmin = (req, res, next) => {  
//     if (req.session.role === 'admin' || req.session.role === 'superadmin') {  
//         return next();  
//     }  
//     res.redirect('/user/dashboard'); // Redirect to user dashboard if not admin  
// // };  
// const jwt = require('jsonwebtoken');  
// const isAdmin = (req, res, next) => {  
//     console.log('User role in isAdmin middleware:', req.session.role); // Debugging log  
//     if (req.session.role === 'admin' || req.session.role === 'superadmin') {  
//         return next();  
//     }  
//     res.redirect('/user/dashboard'); // Redirect to user dashboard if not admin  
// };  

// const isSuperAdmin = (req, res, next) => {  
//     if (req.session.role === 'superadmin') {  
//         return next();  
//     }  
//     res.redirect('/admin/dashboard'); // Redirect to admin dashboard if not superadmin  
// };  

// const isUser = (req, res, next) => {  
//     console.log('Checking if user is valid...'); // Debugging log  
//     console.log('User role in role middleware:', req.userRole);
//     if (req.userRole == 'user') {  
//         return next();  
//     }  
//     console.log('User is not authorized'); // More logging  
//     res.redirect('/login'); // Redirect to login if not user  
// };  

// module.exports = { isAdmin, isSuperAdmin, isUser };

// middleware/authmiddleware.js  

const isAdmin = (req, res, next) => {  
    console.log('User role in isAdmin middleware:', req.userRole); // Debugging log  
    if (req.userRole === 'admin' || req.userRole === 'superadmin') {  
        return next();  // Proceed if role is admin or superadmin  
    }  
    res.redirect('/user/dashboard'); // Redirect to user dashboard if not admin  
};  

const isSuperAdmin = (req, res, next) => {  
    console.log('User role in isSuperAdmin middleware:', req.userRole); // Debugging log  
    if (req.userRole === 'superadmin') {  
        return next();  // Proceed if role is superadmin  
    }  
    res.redirect('/admin/dashboard'); // Redirect to admin dashboard if not superadmin  
};  

const isUser = (req, res, next) => {  
    console.log('Checking if user is valid...'); // Debugging log  
    console.log('User role in role middleware:', req.userRole); // Log the user role  
    if (req.userRole === 'user') {  
        return next();  // Proceed if role is user  
    }  
    console.log('User is not authorized'); // More logging  
    res.redirect('/login'); // Redirect to login if not user  
};  

module.exports = { isAdmin, isSuperAdmin, isUser };