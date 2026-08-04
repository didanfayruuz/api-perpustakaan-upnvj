const express = require('express');
const authRoutes = require('./routes/authRoutes');
const anggotaRoutes = require('./routes/anggotaRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/anggota', anggotaRoutes);

module.exports = app;

