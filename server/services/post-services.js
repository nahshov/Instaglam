const Post = require('../models/Post.js');

// Get all posts of a user
function getAllPosts(user) {
	return Post.find({ user });
}

// Get one post of a user
function getPost(user, _id) {
	return Post.findOne({ user, _id });
}

// createPost
function createPost(post) {
	// Did not use Model.create to be consistent with user services.
	const post = new Post(post);
	return post.save();
}

// removePost
function removePost(_id) {
	return Post.findOneAndRemove({ _id });
}

// Remove all posts from a specific user
function removeAllPosts(user) {
	return Post.deleteMany({ user });
}

// Update post
function updatePost(_id, newContent) {
	return Post.findOneAndUpdate(id, newContent, { new: true });
}

module.exports = {
	getAllPosts,
	getPost,
	createPost,
	removePost,
	removeAllPosts,
	updatePost
};
