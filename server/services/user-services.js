const User = require('../models/User.js');

// Create users
function createUser(user) {
	user = new User(user);
	if (!user.bio) {
		user.bio = `Hello my name is ${user.firstName} ${user.lastName}`;
	}
	return user.save();
}

// Get users
function getUser(email) {
	return User.findOne({ email });
}

// Update users

// Remove users
function deleteUser(email) {
	return User.findOneAndRemove({ email });
}

module.exports = { createUser, getUser, deleteUser };
