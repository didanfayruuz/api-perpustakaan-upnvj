const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];

    if (!authHeader) {
        return res.status(401).json({ 
            success: false,
            message: "Akses ditolak! Token autentikasi tidak ditemukan." 
        });
    }

    // Ambil token baik yang berformat "Bearer <TOKEN>" maupun langsung "<TOKEN>"
    const token = authHeader.startsWith('Bearer ') 
        ? authHeader.slice(7).trim() 
        : authHeader.trim();

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