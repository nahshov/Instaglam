const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
	created : {
		type    : Date,
		default : Date.now
	},
	user    : {
		type     : mongoose.Types.ObjectId,
		ref      : 'User',
		required : true,
		index    : true
	},
	post    : {
		type     : mongoose.Types.ObjectId,
		ref      : 'Post',
		required : true,
		index    : true
	},
	comment    : {
		type     : mongoose.Types.ObjectId,
		ref      : 'Comment',
		required : true
	}
});

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
