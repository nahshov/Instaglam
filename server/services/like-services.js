const Like = require('../models/Like.js');

// @desc: get likes of a post
// @route: /api/likes/:postId
async function getPostLikes(postId) {
	const likes = await Like.find({ post: postId });
	return likes.filter(like => !like.comment);
}

// @desc: get likes of a comment
// @route: /api/comments/:commentId/likes
function getCommentLikes(commentId) {
	return Like.find({ comment: commentId });
}

// @desc: add like to a post
// @route: /api/posts/:postId/likes
async function addLikeToPost(like) {
	const { user, post } = like;
	const doesLikeExist = await Like.findOne({ user, post });
	if (doesLikeExist) {
		return;
	}
	like = new Like(like);
	return like.save();
}

// @desc: add like to a comment
// @route: /api/comments/:commentId/likes
async function addLikeToComment(like) {
	const { user, post, comment } = like;
	const doesLikeExist = await Like.findOne({ user, post, comment });
	if (doesLikeExist) {
		return;
	}
	like = new Like(like);
	return like.save();
}

// @desc: remove like from a post
// @route: /api/posts/:postId/likes
function removeLikeFromPost(likeId) {
	return Like.findOneAndRemove({ _id: likeId });
}

// @desc: remove like from a comment
// @route: /api/comments/:commentId/likes
function removeLikeFromComment(likeId) {
	return Like.findOneAndRemove({ _id: likeId });
}

// @desc: remove all likes of a user
// @route: DELETE /api/me
function removeAllUserLikes(userId) {
	return Like.deleteMany({ user: userId });
}

module.exports = {
	getPostLikes,
	getCommentLikes,
	addLikeToPost,
	addLikeToComment,
	removeLikeFromPost,
	removeLikeFromComment,
	removeAllUserLikes
};
