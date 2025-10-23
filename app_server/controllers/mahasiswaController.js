const Mahasiswa = require('../models/mahasiswaModel');

// Daftar (insert data mahasiswa)
exports.register = (req, res) => {
  const { nama, npm, jurusan } = req.body;

  if (!nama || !npm || !jurusan) {
    return res.status(400).json({ message: 'Semua field wajib diisi!' });
  }

  Mahasiswa.create({ nama, npm, jurusan }, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Gagal menyimpan data mahasiswa' });
    }
    res.status(201).json({ message: 'Data mahasiswa berhasil disimpan!' });
  });
};

// Ambil semua data mahasiswa
exports.getAll = (req, res) => {
  Mahasiswa.findAll((err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data' });
    res.json(results);
  });
};
