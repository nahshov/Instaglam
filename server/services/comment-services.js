const Like = require('../models/Comment.js');

// @desc: get comments of a post
// @route: /api/comments/:postId
function getComments(postId) {
	return Comment.find({ post: postId });
}

// @desc: add comment to a post
// @route: /api/post/comments
async function addComment(comment) {
	comment = new Comment(comment);
	return comment.save();
}

// @desc: remove comment from a post
// @route: /api/comments/:postId
function removeComment(postId, commentId) {
	// return Comment.findOneAndRemove({ post: postId, comment: commentId});
	const neededPost = post.findOne({post: postId})
	neededpost.findOneAndDelete({comment: commentId})
}

// @desc: remove all comments from a post
// @route: /api/posts/:postsId/comments
function removeAllPostComments(postId) {
	return Comment.deleteMany({ post: postId });
	}

// @desc: remove all comments of a user
// @route: /api/posts/:userEmail/comments
function removeAllUserComments(userEmail) {
	return Comment.deleteMany({ user: userEmail });
	}
	
// @desc: update comment of a post
// @route: /api/comments/:postId
async function updateComment(commentId, newContent) {
	return Comment.findOneAndUpdate({ _id: commentId }, newContent, { new: true });
}

module.exports = {
	getComments,
	addComment,
	removeComment,
	removeAllPostComments,
	removeAllUserComments,
	updateComment
};
