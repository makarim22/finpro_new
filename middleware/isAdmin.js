// Middleware to check if user is an admin  
const isAdmin = (req, res, next) => {  
    if (req.session.user && req.session.user.role === 'admin') {  
        return next();  
    }  
    return res.status(403).send('You do not have permission to access this resource.');  
};  

// Use the middleware in the routes  
router.get('/admin/revenue', isAdmin, getTotalRevenuePerParkingLot);