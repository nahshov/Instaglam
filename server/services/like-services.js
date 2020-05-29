const Like = require('../models/Like.js');

// @desc: get likes of a post
// @route: /api/likes/:postId
function getLikes(postId) {
	return Like.find({ post: postId });
}

// @desc: add like to a post
// @route: /api/likes
function addLike(like) {
	like = new Like(like);
	return like.save();
}

// @desc: remove like from a post
// @route: /api/likes/:postId
function removeLike(postId) {
	return Like.findOneAndRemove({ post: postId });
}

module.exports = {
	getLikes,
	addLike,
	removeLike
};
