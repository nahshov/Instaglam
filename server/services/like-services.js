const Like = require('../models/Like.js');

// @desc: get likes of a post
// @route: /api/likes/:postId
function getLikes(postId) {
	return Like.find({ post: postId });
}

// @desc: add like to a post
// @route: /api/likes
async function addLike(like) {
	const { user, post } = like;
	const doesLikeExist = await Like.findOne({ user, post });
	if (doesLikeExist) {
		return;
	}
	like = new Like(like);
	return like.save();
}

// @desc: remove like from a post
// @route: /api/likes/:postId
function removeLike(postId) {
	return Like.findOneAndRemove({ post: postId });
}

// @desc: remove all likes of a user
// @route: DELETE /api/me

function removeAllUserLikes(userId) {
	return Like.deleteMany({ user: userId })
}

module.exports = {
	getLikes,
	addLike,
	removeLike,
	removeAllUserLikes
};
