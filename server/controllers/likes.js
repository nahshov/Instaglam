const {
  getPostLikes,
  getCommentLikes,
  addLikeToPost,
  addLikeToComment,
  removeLikeFromAPost,
  removeLikeFromAComment,
  getPostLikers,
  getCommentLikers
} = require('../services/like-services');

const { getComment } = require('../services/comment-services');
const serverResponse = require('../utils/serverResponse');
const { getPost } = require('../services/post-services');
const { likesOnPostListener, removeLikeOnPostListener } = require('../listeners/activityListeners/likesOnPostListeners');
const { likesOnCommentListener, removeLikeOnCommentListener } = require('../listeners/activityListeners/likesOnCommentListeners');
const { activityEmitter } = require('../events/events');

// @route   GET '/api/posts/:postId/likes'
// @desc    Get likes of a specific post
// @access  private
const getLikesOfPost = async (req, res) => {
  try {
    const post = await getPost(req.params.postId);

    if (!post) {
      return serverResponse(res, 404, { message: "Post doesn't exist" });
    }

    const likes = await getPostLikes(req.params.postId);

    return serverResponse(res, 200, likes);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to get likes'
    });
  }
};

// @route   GET '/api/posts/:postId/likes/users'
// @desc    Get all users who liked a specific post
// @access  private
const getLikersOfPost = async (req, res) => {
  try {
    const post = await getPost(req.params.postId);

    if (!post) {
      return serverResponse(res, 404, { message: "Post doesn't exist" });
    }

    const likers = await getPostLikers(req.params.postId, req.user.sub);

    return serverResponse(res, 200, likers);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to get likes'
    });
  }
};

// @route   GET '/api/comments/:commentId/likes/users'
// @desc    Get all users who liked a specific post
// @access  private
const getLikersOfComment = async (req, res) => {
  try {
    const comment = await getComment(req.params.commentId);

    if (!comment) {
      return serverResponse(res, 404, { message: "Comment doesn't exist" });
    }

    const likers = await getCommentLikers(req.params.commentId, req.user.sub);

    return serverResponse(res, 200, likers);
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
    const post = await getPost(req.params.postId);

    if (!post) {
      return serverResponse(res, 404, { message: "Post doesn't exist" });
    }

    const like = await addLikeToPost({
      post: req.params.postId,
      user: req.user.sub
    });

    if (!like) {
      return serverResponse(res, 400, { message: 'Post already liked' });
    }

    post.numOfLikes++;
    await post.save();

    if (post.user._id.toString() !== req.user.sub) {
      await likesOnPostListener;

      activityEmitter.emit('postLike', {
        post: req.params.postId,
        postBy: post.user,
        liker: req.user.sub,
        likeId: like._id,
        created: new Date()
      });
    }

    return serverResponse(res, 200, like);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to add a like'
    });
  }
};

// @route   DELETE '/api/posts/:postId/likes/:likeId'
// @desc    Delete a like from a post
// @access  private
const deleteLikeFromAPost = async (req, res) => {
  try {
    const like = await removeLikeFromAPost(req.params.postId, req.user.sub);

    if (!like) {
      return serverResponse(res, 404, { message: "Like doesn't exist" });
    }

    const post = await getPost(req.params.postId);

    post.numOfLikes--;
    await post.save();

    await removeLikeOnPostListener;

    activityEmitter.emit('deletePostLike', { likeId: like._id, postId: req.params.postId });

    return serverResponse(res, 200, { message: 'Like successfully removed' });
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
    const comment = await getComment(req.params.commentId);

    if (!comment) {
      return serverResponse(res, 404, { message: "Comment doesn't exist" });
    }

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
    const comment = await getComment(req.params.commentId);

    if (!comment) {
      return serverResponse(res, 404, { message: "Comment doesn't exist" });
    }

    const like = await addLikeToComment({
      user: req.user.sub,
      comment: req.params.commentId
    });

    if (!like) {
      return serverResponse(res, 400, { message: 'Comment already liked' });
    }

    if (comment.user._id.toString() !== req.user.sub) {
      await likesOnCommentListener;

      activityEmitter.emit('commentLike', {
        comment: req.params.commentId,
        commentBy: comment.user,
        liker: req.user.sub,
        likeId: like._id,
        created: new Date()
      });
    }
    comment.numOfLikes++;
    await comment.save();

    return serverResponse(res, 200, like);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to add a like'
    });
  }
};

// @route   DELETE '/api/comments/:commentId/likes/likeId'
// @desc    Remove like to a comment
// @access  private
const deleteLikeFromAComment = async (req, res) => {
  try {
    const like = await removeLikeFromAComment(req.params.commentId, req.user.sub);

    if (!like) {
      return serverResponse(res, 404, { message: "Like doesn't exist" });
    }

    const comment = await getComment(req.params.commentId);

    comment.numOfLikes--;
    await comment.save();

    await removeLikeOnCommentListener;

    activityEmitter.emit('deleteCommentLike', { likeId: like._id, commentId: req.params.commentId });

    return serverResponse(res, 200, like);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to remove a like'
    });
  }
};

module.exports = {
  getLikesOfPost,
  getLikersOfPost,
  getLikersOfComment,
  addLikeToAPost,
  deleteLikeFromAPost,
  getLikesOfComment,
  addLikeToAComment,
  deleteLikeFromAComment
};
