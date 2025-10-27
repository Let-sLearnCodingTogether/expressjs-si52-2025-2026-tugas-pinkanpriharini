const mongoose = require('mongoose');

// Simple User schema matching controller fields
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

const User = {
  // data: { username, email, password }
  create: (data, callback) => {
    const user = new UserModel({ username: data.username, email: data.email, password: data.password });
    user.save((err, saved) => {
      if (err) return callback(err);
      callback(null, saved);
    });
  },

  // callback(err, resultsArray)
  findByEmail: (email, callback) => {
    UserModel.find({ email: email }, (err, docs) => {
      if (err) return callback(err);
      callback(null, docs);
    });
  },

  findById: (id, callback) => {
    UserModel.findById(id, (err, doc) => {
      if (err) return callback(err);
      if (!doc) return callback(null, []);
      callback(null, [doc]); // controller expects results array
    });
  }
};

module.exports = User;
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
