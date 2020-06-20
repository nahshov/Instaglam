const gravatar = require('gravatar');
const User = require('../models/User.js');

// @desc: Create users
// @route: /api/users
function createUser(user) {
  user = new User(user);
  const profilePic = gravatar.url(user.email, {
    s: '200',
    r: 'pg',
    d: 'mm'
  });
  user.profilePic = profilePic.replace(/^\/\//, '');
  if (!user.bio) {
    user.bio = `Hello my name is ${user.fullName}`;
  }
  return user.save();
}

// @desc: Get users
// @route: /api/users/:email
function getUser(email) {
  return User.findOne({ email });
}

// @desc: Update users
// @route: /api/users/:email
async function editUser(email, newData) {
  const user = await User.findOne({ email });
  Object.assign(user, newData);
  return user.save();
}

// @desc: Remove users
// @route: /api/users/:email
async function deleteUser(email) {
  return User.findOneAndRemove({ email });
}

function verifyPassword(user, password) {
  return user.verifyPassword(password);
}

module.exports = { createUser, getUser, deleteUser, editUser, verifyPassword };
