const errorHandler = (err, req, res, next) => { 
    console.error("Global error handler:", err.stack); // Log error ke console

    // Jika status masih 200, ubah menjadi 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler; 