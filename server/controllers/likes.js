const {
  getPostLikes,
  getCommentLikes,
  addLikeToPost,
  addLikeToComment,
  removeLikeFromPost,
  removeLikeFromComment
} = require('../services/like-services');

const Comment = require('../models/Comment');
const serverResponse = require('../utils/serverResponse');
const { getPost } = require('../services/post-services');

// @route   GET '/api/posts/:postId/likes'
// @desc    Get likes of a specific post
// @access  private
const getLikesOfPost = async (req, res) => {
  try {
    const likes = await getPostLikes(req.params.postId);
    return serverResponse(res, 200, likes);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to get likes'
    });
  }
};

// @route   POST '/api/posts/:postId/likes'
// @desc    Add a like to a post
// @access  private
const addLikeToAPost = async (req, res) => {
  try {
    const like = await addLikeToPost({
      post: req.params.postId,
      user: req.user.sub
    });
    const post = await getPost(req.params.postId);

    if (!post) {
      return serverResponse(res, 404, { message: "Post doesn't exist" });
    }

    if (!like) {
      return serverResponse(res, 404, { message: "Like doesn't exist" });
    }

    post.likes++;
    await post.save();
    return serverResponse(res, 200, like);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to add a like'
    });
  }
};

// @route   DELETE '/api/posts/:postId/likes'
// @desc    Delete a like from a post
// @access  private
const deleteLikeFromAPost = async (req, res) => {
  try {
    const like = await removeLikeFromPost(req.user.sub);
    const post = await getPost(req.params.postId);

    if (!post) {
      return serverResponse(res, 404, { message: "Post doesn't exist" });
    }

    if (!like) {
      return serverResponse(res, 404, { message: "Like doesn't exist" });
    }

    post.likes--;
    await post.save();
    return serverResponse(res, 200, like);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to remove a like'
    });
  }
};

// @route   GET '/api/comments/:commentId/likes'
// @desc    Get likes of a comment
// @access  private
const getLikesOfComment = async (req, res) => {
  try {
    const likes = await getCommentLikes(req.params.commentId);
    return serverResponse(res, 200, likes);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to get likes'
    });
  }
};

// @route   POST '/api/comments/:commentId/likes'
// @desc    Add like to a comment
// @access  private
const addLikeToAComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.commentId
    });

    if (!comment) {
      return serverResponse(res, 404, { message: "Comment doesn't exist" });
    }

    const like = await addLikeToComment({
      user: req.user.sub,
      comment: req.params.commentId,
      post: comment.post
    });

    return serverResponse(res, 200, like);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to add a like'
    });
  }
};

// @route   DELETE '/api/comments/:commentId/likes'
// @desc    Remove like to a comment
// @access  private
const deleteLikeFromAComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.commentId
    });

    if (!comment) {
      return serverResponse(res, 404, { message: "Comment doesn't exist" });
    }

    const like = await removeLikeFromComment(req.user.sub);

    if (!like) {
      return serverResponse(res, 404, { message: "Like doesn't exist" });
    }

    return serverResponse(res, 200, like);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to remove a like'
    });
  }
};

module.exports = {
  getLikesOfPost,
  addLikeToAPost,
  deleteLikeFromAPost,
  getLikesOfComment,
  addLikeToAComment,
  deleteLikeFromAComment
};
