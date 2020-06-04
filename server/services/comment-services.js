const Like = require('../models/Comment.js');

// @desc: get comments of a post
// @route: /api/comments/:postId
function getComments(postId) {
	return Comment.find({ post: postId });
}

// @desc: add comment to a post
// @route: /api/comments
async function addComments(comment) {
	comment = new Comment(comment);
	return comment.save();
}

// @desc: remove comment from a post
// @route: /api/comments/:postId
function removeComment(postId) {
	return Comment.findOneAndRemove({ post: postId });
}

// @desc: remove comment from a post
// @route: /api/comments/:postId
async function updateComment(commentId, newContent) {
	return Post.findOneAndUpdate({ _id: commentId }, newContent, { new: true });
}
module.exports = {
	getLikes,
	addLike,
	removeLike
};
