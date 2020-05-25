const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email     : {
		type     : String,
		required : true,
		unique   : true,
		index    : true
	},
	password  : {
		type     : String,
		required : true
	},

	salt      : String,
	firstName : {
		type     : String,
		required : true
	},
	lastName  : {
		type     : String,
		required : true
	},
	city      : String,
	bio       : {
		type : String
	},
	birthDate : String,
	created   : {
		type    : Date,
		default : Date.now
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
