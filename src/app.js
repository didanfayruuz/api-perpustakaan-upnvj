const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const anggotaRoutes = require('./routes/anggotaRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// CORS Middleware (Pasang middleware CORS di paling atas sebelum routes)
app.use(cors({
    origin: 'http://localhost:5173', // Ganti dengan URL frontend Anda
    credentials: true, // Jika Anda ingin mengizinkan pengiriman cookie
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint root / health check
app.get('/', (req, res) => {
res.status(200).json({
success: true,
message: "API Perpustakaan UPNVJ berjalan dengan baik di Vercel!",
version: "1.0.0"
    });
});

// Mounting Routes
app.use('/api/auth', authRoutes);
app.use('/api/anggota', anggotaRoutes);

// Global Error Handling Middleware
app.use(errorHandler);

module.exports = app;


