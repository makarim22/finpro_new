const jwt = require('jsonwebtoken');  

exports.authenticateJWT = (req, res, next) => {  
  const authHeader = req.headers['authorization'];  
  if (!authHeader) {  
    return res.status(401).json({ message: 'Authorization header missing' });  
  }  
  const token = authHeader.split(' ')[1];  
  if (!token) {  
    return res.status(401).json({ message: 'Token missing' });  
  }  
  try {  
    // Verify the token  
    const decoded = jwt.verify(token, 'G7$k9@zP2#qW8!fR3^mN6&vT1*eY5$hJ'); // Use the same secret key  
    // Attach user information to the request object  
    req.userId = decoded.userId;  
    next(); // Proceed to the next middleware or route handler  
  } catch (error) {  
    console.error('Token verification error:', error);  
    return res.status(403).json({ message: 'Invalid or expired token' });  
  }  
};