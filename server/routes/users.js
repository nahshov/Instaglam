const {
	getUser,
	deleteUser,
	editUser
} = require('../services/user-services.js');

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

	app.put('/api/users/:email', async (req, res) => {
		try {
			const user = await editUser(req.params.email, req.body);
			res.status(200).json(user).end();
		} catch (e) {
			res
				.status(500)
				.json({ message: `internal error while trying to update user` })
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
};