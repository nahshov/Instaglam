const {
	getUser,
	deleteUser,
	editUser
} = require('../services/user-services.js');

const {
	removeAllUserPosts
} = require('../services/post-services.js');

const {
	removeAllUserComments
} = require('../services/comment-services.js');

const {
	removeAllUserLikes
} = require('../services/like-services.js');

const verifyUser = require('../services/auth-services')

module.exports = function(app) {
	app.get(`/api/users/:email`, async (req, res) => {
		try {
			const user = await getUser(req.params.email);

			if (!user) {
				return res
					.status(404)
					.json({ message: 'no user with requested email' })
					.end();
			}
			res.status(200).json(user).end();
		} catch (e) {
			res
				.status(500)
				.json({ message: `internal error while trying to find user` })
				.end();
		}
	});

	app.delete('/api/users/:email', async (req, res) => {
		try {
			const user = await deleteUser(req.params.email);
			res.status(200).json(user).end();
		} catch (e) {
			res
				.status(500)
				.json({ message: `internal error while trying to find user` })
				.end();
		}
	});

	//api/me
	app.get(`/api/me`, verifyUser, async (req, res) => {
		try {
			const response = await getUser(req.user.email);
			const user = {email: response.email, firstName: response.firstName, lastName: response.lastName, created: response.created, bio: response.bio,}
			res.status(200).json(user).end();
		} catch (e) {
			res
				.status(500)
				.json({ message: `internal error while trying to find user` })
				.end();
		}
	});

	app.put(`/api/me`, verifyUser, async (req, res) => {
		try {
			const user = await editUser(req.user.email, req.body);
			if(!user) {
				res
				.status(404)
				.json({message: 'no user with requested email'})
				.end();
			}
			res.status(200).json({ message: "Your changes were successfull"}).end();
		} catch (e) {
			res
				.status(500)
				.json({ message: `internal error while trying to update user` })
				.end();
		}
	});

	app.delete('/api/me', verifyUser, async (req, res) => {
		try {
			const promisesArr = [
				removeAllUserPosts(req.user.sub),
				removeAllUserComments(req.user.sub),
				removeAllUserLikes(req.user.sub),
				deleteUser(req.user.email)
			];
			await Promise.all(promisesArr);
			res
			.status(200)
			.json({message: 'User successfully deleted'})
			.end()
		}

		catch (e) {
			res
				.status(500)
				.json({ message: `internal error while trying to delete user` })
				.end();
		}
	})
};