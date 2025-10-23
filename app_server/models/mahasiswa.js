const db = require('../config/db');

const Mahasiswa = {
  getAll: (callback) => {
    db.query('SELECT * FROM mahasiswa', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM mahasiswa WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const query = `INSERT INTO mahasiswa (nama, nim, jurusan) VALUES (?, ?, ?)`;
    db.query(query, [data.nama, data.nim, data.jurusan], callback);
  },

  update: (id, data, callback) => {
    const query = `UPDATE mahasiswa SET nama=?, nim=?, jurusan=? WHERE id=?`;
    db.query(query, [data.nama, data.nim, data.jurusan, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM mahasiswa WHERE id=?', [id], callback);
  }
};

module.exports = Mahasiswa;
