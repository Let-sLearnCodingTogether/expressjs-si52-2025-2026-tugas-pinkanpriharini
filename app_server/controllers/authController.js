const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/authModels');

const SECRET_KEY = process.env.JWT_SECRET || 'pinkan123';

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: 'Semua field wajib diisi' });

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Gagal mengenkripsi password' });

    const newUser = { username, email, password: hashedPassword };

    User.create(newUser, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Gagal mendaftarkan pengguna' });
      }
      res.status(201).json({ message: 'Registrasi berhasil!' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'Kesalahan server' });
    if (results.length === 0)
      return res.status(404).json({ message: 'Email tidak ditemukan' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Kesalahan server' });
      if (!isMatch) return res.status(401).json({ message: 'Password salah' });

      const userIdStr = String(user._id || user.id);
      const token = jwt.sign({ id: userIdStr, email: user.email }, SECRET_KEY, {
        expiresIn: '2h'
      });

      res.json({ message: 'Login berhasil', token });
    });
  });
};

exports.profile = (req, res) => {
  const userId = (req.user && (req.user.id || req.user._id));

  User.findById(userId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Kesalahan server' });
    if (results.length === 0) return res.status(404).json({ message: 'User tidak ditemukan' });

    res.json({ user: results[0] });
  });
};
