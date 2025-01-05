// middleware/errorHandler.js  
const errorHandler = (err, req, res, next) => {  
    console.error(err); // Log the error details (stack trace)  
    res.status(500).render('error', {  
        message: err.message,  
        error: err.error // You can pass any additional information you need  
    });  
};  

module.exports = errorHandler;