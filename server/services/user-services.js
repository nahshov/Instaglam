const { isEmail } = require('validator');
const gravatar = require('gravatar');
const { isValid: isValidObjectId } = require('mongoose').Types.ObjectId;
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

function getUser(userInfo) {
  if (isEmail(userInfo)) {
    return User.findOne({ email: userInfo });
  }

  if (isValidObjectId(userInfo)) {
    return User.findOne({ _id: userInfo });
  }

  return User.findOne({ username: userInfo });
}

function getUsers(userInfo) {
  const regex = new RegExp(userInfo, 'i');

  if (isEmail(userInfo)) {
    return User.find({ email: regex });
  }

  return User.find({ username: regex });
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
  getUsers,
  deleteUser,
  editUser,
  verifyPassword,
  setUserToken,
  verifyToken
};
