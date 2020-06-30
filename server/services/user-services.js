const gravatar = require('gravatar');
const User = require('../models/User.js');

function createUser(user) {
  user = new User(user);
  const profilePic = gravatar.url(user.email, {
    s: '180',
    r: 'pg',
    d: 'mm'
  });
  user.profilePic = profilePic.replace(/^\/\/www\./, 'http://');
  if (!user.bio) {
    user.bio = `Hello my name is ${user.fullName}`;
  }
  return user.save();
}

function getUser(email) {
  return User.findOne({ email });
}

function getUserByUsername(username) {
  return User.findOne({ username });
}

async function editUser(email, newData) {
  const user = await User.findOne({ email });
  Object.assign(user, newData);
  return user.save();
}

async function deleteUser(email) {
  return User.findOneAndRemove({ email });
}

function verifyPassword(user, password) {
  return user.verifyPassword(password);
}

async function verifyToken(decoded) {
  const user = await User.verifyToken(decoded);
  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

async function setUserToken(user, identifier) {
  user.refreshTokenIdentifier = identifier;
  return user.save();
}

module.exports = {
  createUser,
  getUser,
  getUserByUsername,
  deleteUser,
  editUser,
  verifyPassword,
  setUserToken,
  verifyToken
};
