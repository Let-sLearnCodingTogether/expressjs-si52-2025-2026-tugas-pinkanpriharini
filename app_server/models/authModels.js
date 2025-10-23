const db = require('../config/db'); // koneksi database

const Mahasiswa = {
  create: (data, callback) => {
    const query = `INSERT INTO mahasiswa (nama, npm, jurusan) VALUES (?, ?, ?)`;
    db.query(query, [data.nama, data.npm, data.jurusan], callback);
  },

  findAll: (callback) => {
    const query = `SELECT * FROM mahasiswa`;
    db.query(query, callback);
  }
};

module.exports = Mahasiswa;
