const {
	getAllPostsOfUser,
	getPost,
	createPost,
	removePost,
	updatePost,
	getAllPosts
} = require('../services/post-services.js');

const verifyUser = require('../services/auth-services');

const posts = require('../helpers/multer/posts')

const sharp = require('sharp')

const {Storage} = require('@google-cloud/storage')

const path = require('path')

const fs = require('fs')

const gc = new Storage({
	keyFilename: path.join(__dirname, '../iconic-valve-279717-ef625f219bd1.json'), 
	projectId: 'iconic-valve-279717'
});

const instaglamBucket = gc.bucket('instaglam')

module.exports = function(app) {
	app.get('/api/posts/', verifyUser, async (req, res) => {
		try {
			const posts = await getAllPosts(req.query.limit, req.query.skip);
			res.status(200).json(posts).end();
		} catch (e) {
			console.log(e);
			res
				.status(500)
				.json({ message: `internal error while trying to get posts` })
				.end();
		}
	});

	//get all posts of specific user
	app.get('/api/posts/:userId', verifyUser, async (req, res) => {
		try {
			const post = await getAllPostsOfUser(req.params.userId);
			if (!post) {
				return res
					.status(404)
					.json({
						message : 'there are no posts with requested user id'
					})
					.end();
			}
			res.status(200).json(post).end();
		} catch (e) {
			res
				.status(500)
				.json({ message: `internal error while trying to get posts` })
				.end();
		}
	});

	//get one post of a user using post id
	app.get('/api/posts/singlePost/:postId', verifyUser, async (req, res) => {
		try {
			const post = await getPost(req.params.postId);
			if (!post) {
				return res
					.status(404)
					.json({ message: 'no post with requested id' })
					.end();
			}
			res.status(200).json(post).end();
		} catch (e) {
			res
				.status(500)
				.json({ message: `internal error while trying to find post` })
				.end();
		}
	});

	//create a post
	app.post('/api/posts', verifyUser, posts.single('media'), async (req, res) => {
		if (!req.body) {
			return res
				.status(400)
				.json({ message: `request is invalid` })
				.end();
		}

		const file = instaglamBucket.file(req.file.originalname)
		const fileStream = file.createWriteStream({
			metadata: {
				contentType: req.file.mimetype
			}
		})
		fileStream.on('error', err => console.log(err))
		fileStream.on('finish', () => console.log('finished'))
		console.log(req.file)

		fs.renameSync(`../server/test/${req.file.filename}`, `../server/test/${req.file.originalname}`, (err) => {
			console.log('bla')
			if(err) {
				console.log(err);
			}
		});

		instaglamBucket.upload(`../server/test/${req.file.originalname}`, {}, (err, file) => {

			if(!err)
			console.log("upload Completed");
			else
			console.log(err);
	});
		
		// const buffer = await sharp(req.file.buffer).resize(640, 640).png().toBuffer()
		const post = { ...req.body, /*media: buffer*/ user: req.user.sub };
		try {
			const newPost = await createPost(post);
			res.status(200).json(newPost).end();
		} catch (e) {
			res
				.status(500)
				.json({ message: `internal error while trying to create post` })
				.end();
		}
	});

	//remove a post
	app.delete('/api/posts/:postId', verifyUser, async (req, res) => {
		try {
			const post = await removePost(req.params.postId);
			res.status(200).json(post).end();
		} catch (e) {
			res
				.status(500)
				.json({
					message : `internal error while trying to delete a post`
				})
				.end();
		}
	});

	//update a post
	app.put('/api/posts/:postId', verifyUser, async (req, res) => {
		try {
			const post = await updatePost(req.params.postId, req.body);
			res.status(200).json(post).end();
		} catch (e) {
			res
				.status(500)
				.json({ message: `internal error while trying to update post` })
				.end();
		}
	});
};
