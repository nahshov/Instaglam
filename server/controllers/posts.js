const {
  getAllPostsOfUser,
  getPost,
  createPost,
  removePost,
  updatePost,
  getAllPosts
} = require('../services/post-services.js');

const {
  removeLikesFromPost,
  removeLikesFromComment,
  // getPostLikes,
  arePostsLiked,
  isPostLiked,
  areCommentsLiked
} = require('../services/like-services');

const {
  getCommentsOfPost, removeAllPostComments
} = require('../services/comment-services');

const serverResponse = require('../utils/serverResponse');

const { uploadFile, deleteFile } = require('../services/cloud-services');
const formatImage = require('../utils/formatMedia.js');
const { requesterIsAuthenticatedUser } = require('../utils/auth.js');
const { isFollowed } = require('../services/follow-services.js');

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
    const userId = req.user.sub;
    const limit = 2;
    const skip = limit * +req.query.page;
    const posts = await getAllPosts(limit, skip);
    const postsIds = posts.map(p => p._id);
    const [postLikes, postsComments] = await Promise.all([
      arePostsLiked(userId, postsIds),
      Promise.all(
        postsIds.map(id => getCommentsOfPost(id, +req.query.includeComments || undefined))
      )

    ]);
    const commentsIds = postsComments.flat().map(c => c._id);
    const commentLiked = await areCommentsLiked(userId, commentsIds);

    if (posts.length === 0) {
      return serverResponse(res, 200, []);
    }

    return serverResponse(res, 200, posts.map((post, index) => (
      {
        ...post.toObject(),
        isPostLiked: postLikes[post._id],
        comments: postsComments[index].map(
          comment => ({ ...comment.toObject(), isCommentLiked: commentLiked[comment._id] })
        )
      })));
  } catch (e) {
    return serverResponse(res, 500, {
      message: 'internal error while trying to get posts'
    });
  }
};

// @route  GET '/api/posts/:userInfo'
// @desc   Get posts of a user
// @access private
const getPostsOfAUser = async (req, res) => {
  try {
    const posts = await getAllPostsOfUser(req.params.userInfo, +req.query.limit);

    if (posts.length === 0) {
      return serverResponse(res, 200, []);
    }

    const postsIds = posts.map(p => p._id);
    const [postLikes, postsComments] = await Promise.all([
      arePostsLiked(req.user.sub, postsIds),
      Promise.all(
        postsIds.map(id => getCommentsOfPost(id, +req.query.includeComments || undefined))
      )

    ]);
    const commentsIds = postsComments.flat().map(c => c._id);
    const commentLiked = await areCommentsLiked(req.user.sub, commentsIds);

    const postsOfUser = await Promise.all(posts.map(async (post, index) => (
      {
        ...post.toObject(),
        isPostLiked: postLikes[post._id],
        comments: postsComments[index].map(
          comment => ({ ...comment.toObject(), isCommentLiked: commentLiked[comment._id] })
        ),
        user: {
          ...post.user.toObject(),
          isFollowed: await isFollowed(req.user.sub, post.user._id)
        }
      })));

    return serverResponse(res, 200, postsOfUser);
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
  const { postId } = req.params;
  const userId = req.user.sub;
  // const limit = 5;
  // const skip = limit * +req.query.page;
  try {
    const [post, isUserLike, postComments] = await Promise.all([
      getPost(postId),
      isPostLiked(userId, postId),
      getCommentsOfPost(postId)
    ]);
    const commentsIds = postComments.flat().map(c => c._id);
    const commentLiked = await areCommentsLiked(userId, commentsIds);

    if (!post) {
      return serverResponse(res, 404, {
        message: "Post doesn't exist"
      });
    }

    return serverResponse(res, 200, {
      ...post.toObject(),
      isPostLiked: isUserLike,
      user: {
        ...post.user.toObject(),
        isFollowed: await isFollowed(req.user.sub, post.user._id)
      },
      comments: postComments.map(
        comment => ({ ...comment.toObject(), isCommentLiked: !!commentLiked[comment._id] })
      )

    });
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

    if (!post) {
      return serverResponse(res, 404, {
        message: "Post doesn't exist"
      });
    }

    if (!requesterIsAuthenticatedUser(req.user.sub, post.user)) {
      return serverResponse(res, 400, {
        message: 'Unauthorized!'
      });
    }

    const comments = await getCommentsOfPost(req.params.postId);

    const removeLikesFromCommentPromises = comments.map(
      async comment => removeLikesFromComment(comment._id)
    );

    await Promise.all([removeLikesFromPost(req.params.postId),
      removeAllPostComments(req.params.postId),
      deleteFile(post.media),
      removePost(req.params.postId),
      ...removeLikesFromCommentPromises]);
    return serverResponse(res, 200, { message: 'Post successfully deleted' });
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

    if (!postToEdit) {
      return serverResponse(res, 404, {
        message: "Post doesn't exist"
      });
    }

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
