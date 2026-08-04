const db = require('../config/db');
const { usersTable } = require('../models/schema'); 
const { eq } = require('drizzle-orm');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { error } = require('node:console');

// 1. REGISTER
exports.register = async (req, res) => {
    try {
        const { nama, email, password } = req.body || {}; 

        if (!nama || !email || !password) { 
            return res.status(400).json({ success: false, message: "Semua field harus diisi!" });
        }

        // Hash Password 
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const userBaru = await db.insert(usersTable).values({
            nama,
            email,
            password: hashedPassword
        }).returning({ id: usersTable.id, nama: usersTable.nama, email: usersTable.email });

        res.status(201).json({ 
            success: true, 
            message: "User berhasil didaftarkan!", 
            user: userBaru 
        });
    } catch (error) {
        if (error.code === '23505') { // Kode error untuk unique constraint violation   
            return res.status(400).json({ 
                success: false, 
                message: "Email sudah terdaftar. Silakan gunakan email lain!" 
            });
        } 
        res.status(500).json({ success: false, message: "Terjadi kesalahan pada server.", error: error.message });
    }
};

// 2. LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email dan Password harus diisi!" });
        }
       
        // Cari user berdasarkan email
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
        if (!user) {
            return res.status(401).json({ success: false, message: "Email atau Password salah!" });
        }

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Email atau Password salah!" });
        }

        // Terbitkan token JWT
        const token = jwt.sign(
            { id: user.id, nama: user.nama, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ 
            success: true, 
            message: "Login berhasil!", 
            token 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Terjadi kesalahan pada server.", error: error.message });
    }
};


