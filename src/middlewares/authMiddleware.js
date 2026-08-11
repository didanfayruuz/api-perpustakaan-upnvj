const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <TOKEN>"

    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: "Akses ditolak! Token autentikasi tidak ditemukan." 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Menyimpan informasi pengguna yang terverifikasi ke dalam objek req   
        next();
    } catch (error) {
        return res.status(403).json({ 
            success: false,
            message: "Token tidak valid atau telah kedaluwarsa!"
        });
    }
};

module.exports = verifyToken;