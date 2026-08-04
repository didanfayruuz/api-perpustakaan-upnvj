const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

let daftarAnggota = [
    { nim: "2410114002", nama: "Farhan Baskoro", umur: 21, jurusan: "Informatika" },
    { nim: "2410114004", nama: "Laras Widyaningrum", umur: 21, jurusan: "Sistem Informasi" },
    { nim: "2410114006", nama: "Rian Herdian", umur: 21, jurusan: "Teknologi Informasi" }
];

app.get('/anggota', (req, res) => {
    res.status(200).json(daftarAnggota); 
});

app.get('/anggota/:nim', (req, res) => {
    const nimParam = req.params.nim;
    const anggota = daftarAnggota.find(a => a.nim === nimParam);

    if (anggota) {
        res.json(anggota);
    } else {
        res.status(404).json({ message: "Anggota tidak ditemukan" }); 
    }
});

app.post('/anggota', (req, res) => {
    const { nim, nama, umur, jurusan } = req.body;

    if (!nim || !nama || !umur || !jurusan) {
        return res.status(400).json({ pesan: "NIM, Nama, Umur, dan Jurusan harus diisi!" });
    }

    const anggotaBaru = { nim, nama, umur, jurusan };
    daftarAnggota.push(anggotaBaru);

    res.json({
        message: `Berhasil menambahkan anggota baru bernama ${nama}`
    });
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});