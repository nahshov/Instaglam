const User = require('../models/User.js');

// @desc: Create users
// @route: /api/users
function createUser(user) {
	user = new User(user);
	if (!user.bio) {
		user.bio = `Hello my name is ${user.firstName} ${user.lastName}`;
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
function editUser(email, newData) {
	return User.findOneAndUpdate(email, newData, { new: true });
}

// @desc: Remove users
// @route: /api/users/:email
function deleteUser(email) {
	return User.findOneAndRemove({ email });
}

module.exports = { createUser, getUser, deleteUser, editUser };
