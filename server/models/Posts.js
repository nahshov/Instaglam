const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    created   : {
		type    : Date,
		default : Date.now
	},
    content: String,
    image: String,
    likes: String,
    user: String
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;