const {
  getAllPostsOfUser,
  getPost,
  createPost,
  removePost,
  updatePost,
  getAllPosts
} = require('../services/post-services.js');
const response = require('../utils/response');

//  @TODO: uncomment after fixing google cloud ☟
// const { uploadFile, deleteFile } = require('../services/cloud-services');
// const formatImage = require('../utils/formatMedia.js');

const submitPost = async (req, res) => {
  try {
    // @TODO: Fix google cloud upload and uncomment
    // const buffer = await formatImage(req.file, 600);
    // const mediaUrl = await uploadFile(req.file.originalname, buffer);
    const post = {
      ...req.body,
      user: req.user.sub,
      media: 'https:/www.google.com' /* switch with mediaUrl */
    };
    const newPost = await createPost(post);
    return response(res, 200, newPost);
  } catch (e) {
    return response(res, 500, {
      message: 'Internal error while trying to submit a post'
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts(req.query.limit, req.query.skip);
    return response(res, 200, posts);
  } catch (e) {
    return response(res, 500, {
      message: `internal error while trying to get posts`
    });
  }
};

const getPostsOfAUser = async (req, res) => {
  try {
    const posts = await getAllPostsOfUser(req.params.userId);

    if (!posts.length) {
      return response(res, 404, {
        message: 'there are no posts with requested user id'
      });
    }

    return response(res, 200, posts);
  } catch (e) {
    return response(res, 500, {
      message: 'Internal error while trying to get posts'
    });
  }
};

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
      .json({ message: `internal error while trying to find post` })
      .end();
  }
};

const deletePost = async (req, res) => {
  try {
    // @TODO: Uncomment after fixing google cloud
    // const post = await getPost(req.params.postId);
    // await deleteFile(post.media);
    await removePost(req.params.postId);
    return response(res, 200, { message: 'File successfully deleted' });
  } catch (e) {
    return response(res, 500, {
      message: `internal error while trying to delete a post`
    });
  }
};

const editPost = async (req, res) => {
  try {
    const post = await updatePost(req.params.postId, req.body);
    return response(res, 200, post);
  } catch (e) {
    return response(res, 500, {
      message: `internal error while trying to update post`
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
