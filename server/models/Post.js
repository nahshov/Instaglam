const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    created   : {
		type    : Date,
		default : Date.now
	},
    content: String,
    image: String,
    video: String,
    likes: String,
        user: {
            type: String,
            required: true,
        } 
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;