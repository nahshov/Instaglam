const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	created : {
		type    : Date,
		default : Date.now
	},
	content : String,
	image   : String,
	video   : String,
	likes   : Number,
	user    : {
		type     : mongoose.Types.ObjectId,
		ref      : 'User',
		index    : true,
		required : true
	}
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
