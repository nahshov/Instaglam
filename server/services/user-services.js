const User = require('../models/User.js');

// Create users
function createUser(user) {
	user = new User(user);
	return user.save();
}

// Get users
function getUser(ID) {
	return User.findOne({ _id: ID });
}
// Update users

// Remove users
function deleteUser(ID) {
	return User.findOneAndRemove({ _id: ID });
}

module.exports = { createUser, getUser, deleteUser };
