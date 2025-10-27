const mongoose = require('mongoose');

// Mongoose User model used by authController
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
    user
      .save()
      .then(saved => callback(null, saved))
      .catch(err => callback(err));
  },

  // callback(err, resultsArray)
  findByEmail: (email, callback) => {
    UserModel.find({ email: email })
      .lean()
      .exec()
      .then(docs => callback(null, docs))
      .catch(err => callback(err));
  },

  findById: (id, callback) => {
    UserModel.findById(id)
      .lean()
      .exec()
      .then(doc => {
        if (!doc) return callback(null, []);
        return callback(null, [doc]); // controller expects results array
      })
      .catch(err => callback(err));
  }
};

module.exports = User;
