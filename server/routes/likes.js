const { getPostLikes,
	getCommentLikes,
	addLikeToPost,
	addLikeToComment,
	removeLikeFromPost,
	removeLikeFromComment
} = require('../services/like-services');

const Comment = require('../models/Comment')

const verifyUser = require('../services/auth-services');

module.exports = function(app) {
	// get all likes of a specific post
	app.get('/api/posts/:postId/likes', verifyUser, async (req, res) => {
		try {
			const likes = await getPostLikes(req.params.postId);
			res.status(200).json(likes).end();
		} catch (error) {
			res
				.status(500)
				.json({ message: `internal error while trying to get likes` })
				.end();
		}
	});

	// Add likes of a post
	app.post('/api/posts/:postId/likes', verifyUser, async (req, res) => {
		try {
			const like = await addLikeToPost({post: req.params.postId, user: req.user.sub});
			res.status(200).json(like).end();
		} catch (error) {
			res
				.status(500)
				.json({ message: `internal error while trying to add a like` })
				.end();
		}
	});

	// Remove like from a post
	app.delete('/api/posts/:postId/likes/:likeId', verifyUser, async (req, res) => {
		try {
			const like = await removeLikeFromPost(req.params.postId);
			res.status(200).json(like).end();
		} catch (error) {
			res
				.status(500)
				.json({
					message : `internal error while trying to remove a like`
				})
				.end();
		}
	});


	// Get likes of a comment
	app.get('/api/comments/:commentId/likes', verifyUser, async (req, res) => {
		try {
			const likes = await getCommentLikes(req.params.commentId);
			res.status(200).json(likes).end();
		} catch (error) {
			res
				.status(500)
				.json({ message: `internal error while trying to get likes` })
				.end();
		}
	});

	// Add likes to a comment
	app.post('/api/comments/:commentId/likes', verifyUser, async (req, res) => {
		try {
			const comment = await Comment.findOne({_id: req.params.commentId})
			const like = await addLikeToComment({ user: req.user.sub, comment: req.params.commentId, post: comment.post});
			res.status(200).json(like).end();
		} catch (error) {
			console.log(error);
			res
				.status(500)
				.json({ message: `internal error while trying to add a like` })
				.end();
		}
	});

	// Remove like from a comment
	app.delete('/api/comments/:commentId/likes', verifyUser, async (req, res) => {
		try {
			const like = await removeLikeFromComment(req.params.commentId);
			res.status(200).json(like).end();
		} catch (error) {
			res
				.status(500)
				.json({
					message : `internal error while trying to remove a like`
				})
				.end();
		}
	});
};
