const db = require('../config/db');
const { anggotaTable } = require('../models/schema');
const { eq } = require('drizzle-orm');

// 1. Get All Anggota
exports.getAllAnggota = async (req, res) => {
    try {
        const anggotaList = await db.select().from(anggotaTable);
        res.status(200).json({ success: true, data: anggotaList });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Get Anggota By ID
exports.getAnggotaById = async (req, res) => {
    try {
        const { id } = req.params;
        const [anggota] = await db.select().from(anggotaTable).where(eq(anggotaTable.id, Number(id)));

        if (!anggota) {
            return res.status(404).json({ success: false, message: "Anggota tidak ditemukan!" });
        }

        res.status(200).json({ success: true, data: anggota });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Add / Create Anggota
exports.addAnggota = async (req, res) => {
    try {
        const { nama, nim, umur, jurusan } = req.body || {};

        if (!nama || !nim || !umur || !jurusan) {
            return res.status(400).json({ success: false, message: "Semua field (nama, nim, umur, jurusan) harus diisi!" });
        }

        const [anggotaBaru] = await db.insert(anggotaTable).values({
            nama, nim, umur: Number(umur), jurusan
        }).returning();

        res.status(201).json({ success: true, message: "Anggota berhasil ditambahkan!", data: anggotaBaru });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ success: false, message: "NIM sudah terdaftar!" });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createAnggota = exports.addAnggota;

// 4. Update Anggota
exports.updateAnggota = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, nim, umur, jurusan } = req.body || {};

        const [existing] = await db.select().from(anggotaTable).where(eq(anggotaTable.id, Number(id)));
        if (!existing) {
            return res.status(404).json({ success: false, message: "Anggota tidak ditemukan!" });
        }

        const [updated] = await db.update(anggotaTable)
            .set({
                nama: nama ?? existing.nama,
                nim: nim ?? existing.nim,
                umur: umur ? Number(umur) : existing.umur,
                jurusan: jurusan ?? existing.jurusan
            })
            .where(eq(anggotaTable.id, Number(id)))
            .returning();

        res.status(200).json({ success: true, message: "Data anggota berhasil diperbarui!", data: updated });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ success: false, message: "NIM sudah digunakan oleh anggota lain!" });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// 5. Delete Anggota
exports.deleteAnggota = async (req, res) => {
    try {
        const { id } = req.params;
        const [existing] = await db.select().from(anggotaTable).where(eq(anggotaTable.id, Number(id)));
        if (!existing) {
            return res.status(404).json({ success: false, message: "Anggota tidak ditemukan!" });
        }

        await db.delete(anggotaTable).where(eq(anggotaTable.id, Number(id)));

        res.status(200).json({ success: true, message: "Anggota berhasil dihapus!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};