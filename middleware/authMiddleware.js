const jwt = require('jsonwebtoken');  

// exports.authenticateJWT = (req, res, next) => {  
//   const authHeader = req.headers['authorization'];  
//   if (!authHeader) {  
//     return res.status(401).json({ message: 'Authorization header missing' });  
//   }  
//   const token = authHeader.split(' ')[1];  
//   if (!token) {  
//     return res.status(401).json({ message: 'Token missing' });  
//   }  
//   try {  
//     // Verify the token  
//     const decoded = jwt.verify(token, 'G7$k9@zP2#qW8!fR3^mN6&vT1*eY5$hJ'); // Use the same secret key  
//     // Attach user information to the request object  
//     req.userId = decoded.userId;  
//     next(); // Proceed to the next middleware or route handler  
//   } catch (error) {  
//     console.error('Token verification error:', error);  
//     return res.status(403).json({ message: 'Invalid or expired token' });  
//   }  
// };


// exports.authenticateJWT = (req, res, next) => {  
//     const authHeader = req.headers['authorization'];  
//     if (!authHeader) {  
//         return res.status(401).json({ message: 'Authorization header missing' });  
//     }  
//     const token = authHeader.split(' ')[1];  
//     if (!token) {  
//         return res.status(401).json({ message: 'Token missing' });  
//     }  
//     try {  
//         // Verify the token using the secret from environment variables  
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);  
//         // Attach user ID and role to the request object  
//         req.userId = decoded.id; // Assuming your token payload contains 'id'  
//         req.userRole = decoded.role; // Assuming your token payload contains 'role'  
//         next(); // Proceed to the next middleware or route handler  
//     } catch (error) {  
//         console.error('Token verification error:', error);  
//         return res.status(403).json({ message: 'Invalid or expired token' });  
//     }  
// };

// exports.authenticateJWT = (req, res, next) => {  
//   const token = req.cookies.token; // Retrieve the token from cookies  
//   if (!token) {  
//       return res.status(401).json({ message: 'Token missing' });  
//   }  
//   try {  
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);  
//       req.userId = decoded.id; // Assuming your token payload contains 'id'  
//       req.userRole = decoded.role; // Assuming your token payload contains 'role'  
//       next(); // Proceed to the next middleware or route handler  
//   } catch (error) {  
//       console.error('Token verification error:', error);  
//       return res.status(403).json({ message: 'Invalid or expired token' });  
//   }  
// }; 


exports.authenticateJWT = (req, res, next) => {  
    const token = req.cookies.token; // Retrieve the token from cookies  
    if (!token) {  
        return res.status(401).json({ message: 'Token missing' });  
    }  
    try {  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        req.userId = decoded.id; // Assuming your token payload contains 'id'  
        req.userRole = decoded.role; 
        req.username = decoded.username// Assuming your token payload contains 'role'  
        next(); // Proceed to the next middleware or route handler  
    } catch (error) {  
        console.error('Token verification error:', error);  
        return res.status(403).json({ message: 'Invalid or expired token' });  
    }  
};