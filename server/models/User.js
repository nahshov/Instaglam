const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email     : {
		type     : String,
		required : true,
		unique   : true
	},
	password  : {
		type    : String,
		required : true,
	},
	
	salt      : String,
	firstName : String,
	lastName  : String,
	city      : String,
	bio       : String,
	birthDate : String,
	created   : {
		type    : Date,
		default : Date.now
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
