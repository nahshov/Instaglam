const sharp = require('sharp');

const {
  getAllPostsOfUser,
  getPost,
  createPost,
  removePost,
  updatePost,
  getAllPosts
} = require('../services/post-services.js');
const { verifyUser } = require('../services/auth-services');
const postsHandler = require('../multer/posts');
const { uploadFile, deleteFile } = require('../services/cloud-services');

module.exports = function (app) {
  //create a post
  app.post(
    '/api/posts',
    verifyUser,
    postsHandler.single('media'),
    async (req, res) => {
      if (!req.body) {
        return res.status(400).json({ message: `request is invalid` }).end();
      }
      try {
        let buffer;

        if (
          !(
            req.file.originalname.endsWith('mov') ||
            req.file.originalname.endsWith('mp4')
          )
        ) {
          buffer = await sharp(req.file.buffer)
            .resize(600, 600)
            .jpeg()
            .toBuffer();
        } else {
          buffer = req.file.buffer;
        }

        const mediaUrl = await uploadFile(req.file.originalname, buffer);
        const post = {
          ...req.body,
          user: req.user.sub,
          media: mediaUrl
        };
        const newPost = await createPost(post);
        res.status(200).json(newPost).end();
      } catch (e) {
        res
          .status(500)
          .json({
            message: `internal error while trying to create post`
          })
          .end();
      }
    }
  );

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
            message: 'there are no posts with requested user id'
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

  //remove a post
  app.delete('/api/posts/:postId', verifyUser, async (req, res) => {
    try {
      const post = await getPost(req.params.postId);
      await removePost(req.params.postId);
      await deleteFile(post.media);
      res.status(200).json({ message: 'File successfully deleted' }).end();
    } catch (e) {
      res
        .status(500)
        .json({
          message: `internal error while trying to delete a post`
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
