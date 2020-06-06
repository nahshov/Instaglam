const {
	getComments,
	addComment,
	removeComment,
	removeAllPostComments,
	removeAllUserComments,
	updateComment
} = require('../services/comment-services');

const verifyUser = require('../services/auth-services');

module.exports = function(app) {
	// get all comments of a specific post
	app.get('/api/posts/:postId/comments', verifyUser, async (req, res) => {
		try {
			const comments = await getComments(req.params.postId);
			res.status(200).json(comments).end();
		} catch (error) {
			res
				.status(500)
				.json({
					message : `internal error while trying to get all comments for this post`
				})
				.end();
		}
	});

	// Add comments to a post
	app.post('/api/posts/:postId/comments', verifyUser, async (req, res) => {
		try {
			const comment = await addComment(req.body);
			res.status(200).json(comment).end();
		} catch (error) {
			res
				.status(500)
				.json({
					message : `internal error while trying to add a comment`
				})
				.end();
		}
	});

	// Remove a single comment from a post
	app.delete(
		'/api/posts/:postId/comments/:commentId',
		verifyUser,
		async (req, res) => {
			try {
				const comment = await removeComment(req.params.commentId);
				res.status(200).json(comment).end();
			} catch (error) {
				res
					.status(500)
					.json({
						message : `internal error while trying to remove a comment`
					})
					.end();
			}
		}
	);

	// Remove all comments from a post
	app.delete('/api/comments/:postId', verifyUser, async (req, res) => {
		try {
			const comment = await removeAllPostComments(req.params.postId);
			res.status(200).json(comment).end();
		} catch (error) {
			res
				.status(500)
				.json({
					message : `internal error while trying to remove all the comments from the post`
				})
				.end();
		}
	});

	// Remove all comments of a user
	app.delete('/api/users/comments/:userId', verifyUser, async (req, res) => {
		try {
			const comment = await removeAllUserComments(req.params.userId);
			res.status(200).json(comment).end();
		} catch (error) {
			res
				.status(500)
				.json({
					message : `internal error while trying to remove all the comments of the user`
				})
				.end();
		}
	});

	//update a comment in a post
	app.put(
		'/api/posts/:postId/comments/:commentId',
		verifyUser,
		async (req, res) => {
			try {
				const comment = await updateComment(
					req.params.commentId,
					req.body
				);
				res.status(200).json(comment).end();
			} catch (error) {
				res
					.status(500)
					.json({
						message : `internal error while trying to update comment`
					})
					.end();
			}
		}
	);
};
