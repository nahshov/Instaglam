const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
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
	content: {
		type: string,
		required: true
	}
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
