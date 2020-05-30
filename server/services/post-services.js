const Post = require('../models/Post.js');

// @desc: Get all posts of a user
// @route: /api/posts/:userId
function getAllPosts() {
	return Post.find({});
}
// @desc: Get all posts of a user
// @route: /api/posts/:userId
function getAllPostsOfUser(userId) {
	return Post.find({ user: userId });
}

// @desc: Get one post of a userEmail
// @route: /api/posts/:id
function getPost(postId) {
	return Post.findOne({ _id: postId });
}

// @desc: createPost
// @route: /api/posts
function createPost(post) {
	// Did not use Model.create to be consistent with userEmail services.
	post = new Post(post);
	return post.save();
}

// @desc: removePost
// @route: /api/posts/:email/:id
function removePost(postId) {
	return Post.findOneAndRemove({ _id: postId });
}

// @desc: Remove all posts from a specific userEmail
// @route: /api/posts/:email
function removeAllPosts(userEmail) {
	return Post.deleteMany({ user: userEmail });
}

// @desc: Update post
// @route: /api/posts/:email/:id
async function updatePost(postId, newContent) {
	return Post.findOneAndUpdate({ _id: postId }, newContent, { new: true });
}

module.exports = {
	getAllPostsOfUser,
	getPost,
	createPost,
	removePost,
	removeAllPosts,
	updatePost,
	getAllPosts
};
