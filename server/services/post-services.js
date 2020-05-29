const Post = require('../models/Post.js');

// Get all posts of a userEmail
function getAllPosts(userEmail) {
	return Post.find({ user: userEmail });
}

// Get one post of a userEmail
function getPost(postId) {
	return Post.findOne({ _id: postId });
}

// createPost
function createPost(post) {
	// Did not use Model.create to be consistent with userEmail services.
	post = new Post(post);
	return post.save();
}

// removePost
function removePost(postId) {
	return Post.findOneAndRemove({ _id: postId });
}

// Remove all posts from a specific userEmail
function removeAllPosts(userEmail) {
	return Post.deleteMany({ user: userEmail });
}

// Update post
async function updatePost(postId, newContent) {
	return Post.findOneAndUpdate({ _id: postId }, newContent, { new: true });
}

module.exports = {
	getAllPosts,
	getPost,
	createPost,
	removePost,
	removeAllPosts,
	updatePost
};
