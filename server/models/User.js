const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String,
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    uniqe: true,
    index: true,
    required: true
  },
  profilePic: {
    type: String
  },
  city: String,
  bio: {
    type: String
  },
  refreshTokenIdentifier: String,
  birthDate: String,
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function hashPassword() {
  const user = this;
  if (user.isModified('password')) {
    user.salt = crypto.randomBytes(16);
    const hash = crypto.createHash('sha256');
    hash.update(user.password + user.salt);
    user.password = hash.digest('hex');
  }

  return Promise.resolve();
});

UserSchema.methods.verifyPassword = function verifyPassword(password) {
  const user = this;
  const hash = crypto.createHash('sha256');
  hash.update(password + user.salt);
  return user.password === hash.digest('hex');
};

UserSchema.methods.toJSON = function toJSON() {
  const user = this;

  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.salt;
  delete userObject.refreshTokenIdentifier;

  return userObject;
};

UserSchema.statics.verifyToken = function (decoded) {
  return this.findOne({
    _id: decoded.sub,
    refreshTokenIdentifier: decoded.created
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
