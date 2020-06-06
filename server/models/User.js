const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
	email                  : {
		type     : String,
		required : true,
		unique   : true,
		index    : true
	},
	password               : {
		type     : String,
		required : true
	},

	salt                   : String,
	firstName              : {
		type     : String,
		required : true
	},
	lastName               : {
		type     : String,
		required : true
	},
	city                   : String,
	bio                    : {
		type : String
	},
	refreshTokenIdentifier : String,
	birthDate              : String,
	created                : {
		type    : Date,
		default : Date.now
	}
});


UserSchema.pre('save', function() {
	const user = this;
	if (user.isModified('password')) {
		user.salt = crypto.randomBytes(16);
		const hash = crypto.createHash('sha256');
		hash.update(user.password + user.salt);
		user.password = hash.digest('hex');
	}

	return Promise.resolve();
});

UserSchema.methods.verifyPassword = function(password) {
	const user = this;
	const hash = crypto.createHash('sha256');
	hash.update(password + user.salt);
	return user.password === hash.digest('hex');
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
