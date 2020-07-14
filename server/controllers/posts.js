const {
  getAllPostsOfUser,
  getPost,
  createPost,
  removePost,
  updatePost,
  getAllPosts
} = require('../services/post-services.js');
const serverResponse = require('../utils/serverResponse');

const { uploadFile, deleteFile } = require('../services/cloud-services');
const formatImage = require('../utils/formatMedia.js');
const { requesterIsAuthenticatedUser } = require('../utils/auth.js');

// @route  POST '/api/posts'
// @desc   Submit a posts
// @access private
const submitPost = async (req, res) => {
  try {
    const buffer = await formatImage(req.file, 600);
    const mediaUrl = await uploadFile(req.file.originalname, buffer);
    const post = {
      ...req.body,
      user: req.user.sub,
      media: mediaUrl
    };
    const newPost = await createPost(post);
    return serverResponse(res, 200, newPost);
  } catch (e) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to submit a post'
    });
  }
};

// @route  GET '/api/posts'
// @desc   Get all posts
// @access private
const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts(req.query.limit, req.query.skip);
    return serverResponse(res, 200, posts);
  } catch (e) {
    return serverResponse(res, 500, {
      message: 'internal error while trying to get posts'
    });
  }
};

// @route  GET '/api/posts/:userId'
// @desc   Get posts of a user
// @access private
const getPostsOfAUser = async (req, res) => {
  try {
    const posts = await getAllPostsOfUser(req.params.userId);

    if (!posts.length) {
      return serverResponse(res, 404, {
        message: 'there are no posts with requested user id'
      });
    }

    return serverResponse(res, 200, posts);
  } catch (e) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to get posts'
    });
  }
};

// @route  GET '/api/posts/singlePost/:postId'
// @desc   Get one post, with post id
// @access private
const getOnePost = async (req, res) => {
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
      .json({ message: 'internal error while trying to find post' })
      .end();
  }
};

// @route  DELETE '/api/posts/:postId'
// @desc   Delete post of authenticated user
// @access private
const deletePost = async (req, res) => {
  try {
    const post = await getPost(req.params.postId);

    if (!requesterIsAuthenticatedUser(req.user.sub, post.user)) {
      return serverResponse(res, 400, {
        message: 'Unauthorized!'
      });
    }

    await deleteFile(post.media);
    await removePost(req.params.postId);
    return serverResponse(res, 200, { message: 'File successfully deleted' });
  } catch (e) {
    return serverResponse(res, 500, {
      message: 'internal error while trying to delete a post'
    });
  }
};

// @route  PUT '/api/posts/:postId'
// @desc   Edit post of authenticated user
// @access private
const editPost = async (req, res) => {
  try {
    const postToEdit = await getPost(req.params.postId);
    if (!requesterIsAuthenticatedUser(req.user.sub, postToEdit.user)) {
      return serverResponse(res, 400, {
        message: 'Unauthorized!'
      });
    }
    const post = await updatePost(req.params.postId, req.body);
    return serverResponse(res, 200, post);
  } catch (e) {
    return serverResponse(res, 500, {
      message: 'internal error while trying to update post'
    });
  }
};

module.exports = {
  submitPost,
  getPosts,
  getPostsOfAUser,
  getOnePost,
  deletePost,
  editPost
};
