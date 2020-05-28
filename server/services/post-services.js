const Post = require('../models/Posts.js');

// Get all posts of a userEmail
function getAllPosts(userEmail) {
	return Post.find({ userEmail });
}

// Get one post of a userEmail
function getPost(userEmail, postId) {
	return Post.findOne({ userEmail, postId });
}

createPost
function createPost(post) {
	// Did not use Model.create to be consistent with userEmail services.
	post = new Post(post);
	return post.save();
}

// removePost
function removePost(postId) {
	return Post.findOneAndRemove({ postId });
}

// Remove all posts from a specific userEmail
function removeAllPosts(userEmail) {
	return Post.deleteMany({ userEmail });
}

// Update post
function updatePost(postId, newContent) {
	return Post.findOneAndUpdate(postId, newContent, { new: true });
}

module.exports = {
	getAllPosts,
	getPost,
	createPost,
	removePost,
	removeAllPosts,
	updatePost
};
