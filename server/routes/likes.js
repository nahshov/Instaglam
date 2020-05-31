const { getLikes, addLike, removeLike } = require('../services/like-services');

const verifyUser = require('../services/auth-services');

module.exports = function(app) {
	// get all likes of a specific post
	app.get('/api/likes/:postId', verifyUser, async (req, res) => {
		try {
			const likes = await getLikes(req.params.postId);
			res.status(200).json(likes).end();
		} catch (error) {
			res
				.status(500)
				.json({ message: `internal error while trying to likes` })
				.end();
		}
	});

	// Add likes to a post
	app.post('/api/likes', verifyUser, async (req, res) => {
		try {
			const like = await addLike(req.body);
			res.status(200).json(like).end();
		} catch (error) {
			res
				.status(500)
				.json({ message: `internal error while trying to add a like` })
				.end();
		}
	});

	// Remove like
	app.delete('/api/likes/:postId', verifyUser, async (req, res) => {
		try {
			const like = await removeLike(req.params.postId);
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
