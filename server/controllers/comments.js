const {
  getComment,
  getCommentsOfPost,
  getRepliesOfComment,
  addComment,
  removeComment,
  removeAllCommentReplies,
  updateComment
} = require('../services/comment-services');

const { removeLikesFromComment } = require('../services/like-services');

const { getPost } = require('../services/post-services');
const { commentListener, removeCommentListener } = require('../listeners/activityListeners/commentListeners');
const { replyListener, removeReplyListener } = require('../listeners/activityListeners/replyListener');
const { activityEmitter } = require('../events/events');
const serverResponse = require('../utils/serverResponse');
const { requesterIsAuthenticatedUser } = require('../utils/auth.js');

// @route   GET '/api/posts/:postId/comments'
// @desc    get all comments of a specific post
// @access  private
const getCommentsOfAPost = async (req, res) => {
  try {
    const post = await getPost(req.params.postId);

    if (!post) {
      return serverResponse(res, 404, { message: "Post doesn't exist" });
    }

    const comments = await getCommentsOfPost(req.params.postId);

    return serverResponse(res, 200, comments);
  } catch (e) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to get all comments for this post'
    });
  }
};

// @route   GET '/api/comments/:commentId/replies'
// @desc    get all replies of a specific comment
// @access  private
const getRepliesOfAComment = async (req, res) => {
  try {
    const comment = await getComment(req.params.commentId);

    if (!comment) {
      return serverResponse(res, 404, { message: "Comment doesn't exist" });
    }

    const replies = await getRepliesOfComment(req.params.commentId);

    return serverResponse(res, 200, replies);
  } catch (e) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to get all replies of this comment'
    });
  }
};

// @route   POST '/api/posts/:postId/comments'
// @desc    add a comment to a post
// @access  private
const addCommentToPost = async (req, res) => {
  try {
    const post = await getPost(req.params.postId);

    if (!post) {
      return serverResponse(res, 404, { message: "Post doesn't exist" });
    }

    const comment = {
      ...req.body,
      user: req.user.sub,
      post: req.params.postId
    };

    post.numOfComments++;

    const [response] = await Promise.all([addComment(comment), post.save()]);

    if (post.user._id.toString() !== req.user.sub) {
      await commentListener;

      activityEmitter.emit('comment', {
        post: req.params.postId,
        postBy: post.user,
        commenter: req.user.sub,
        commentId: response._id,
        created: new Date()
      });
    }
    return serverResponse(res, 200, response);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to add a comment'
    });
  }
};

// @route   POST '/api/posts/:postId/comments/:commentId/replies'
// @desc    add a reply to a specific comment
// @access  private
const addReplyToComment = async (req, res) => {
  try {
    const comment = await getComment(req.params.commentId);

    if (!comment) {
      return serverResponse(res, 404, { message: "Comment doesn't exist" });
    }

    const post = await getPost(req.params.postId);

    const reply = {
      ...req.body,
      user: req.user.sub,
      post: req.params.postId,
      replyToComment: comment.replyToComment || req.params.commentId
    };

    post.numOfComments++;

    const [response] = await Promise.all([addComment(reply), post.save()]);

    if (comment.user._id.toString() !== req.user.sub) {
      await replyListener;

      activityEmitter.emit('reply', {
        comment: comment.replyToComment || req.params.commentId,
        commentBy: comment.user,
        replier: req.user.sub,
        replyId: response._id,
        created: new Date()
      });
    }

    return serverResponse(res, 200, response);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to add a reply'
    });
  }
};

// @route   DELETE '/api/posts/:postId/comments/:commentId'
// @desc    Remove a single comment/reply
// @access  private
const removeAComment = async (req, res) => {
  try {
    const getAComment = await getComment(req.params.commentId);

    if (!getAComment) {
      return serverResponse(res, 404, { message: "Comment doesn't exist" });
    }

    if (!requesterIsAuthenticatedUser(req.user.sub, getAComment.user)) {
      return serverResponse(res, 400, {
        message: 'Unauthorized!'
      });
    }

    const replies = await getRepliesOfComment(req.params.commentId);

    const removeLikesFromReplyPromises = replies.map(reply => removeLikesFromComment(reply));

    const post = await getPost(req.params.postId);
    post.numOfComments -= replies.length;
    post.numOfComments--;

    const [comment] = await Promise.all([removeComment(req.params.commentId),
      removeLikesFromComment(req.params.commentId),
      removeAllCommentReplies(req.params.commentId),
      removeLikesFromComment(req.params.commentId),
      ...removeLikesFromReplyPromises,
      post.save()]);

    if (getAComment.replyToComment) {
      await removeReplyListener;

      activityEmitter.emit('deleteReply', { replyId: req.params.commentId, commentId: getAComment.replyToComment });
    } else {
      await removeCommentListener;

      activityEmitter.emit('deleteComment', { commentId: req.params.commentId, postId: post._id });
    }

    return serverResponse(res, 200, comment);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to remove a comment'
    });
  }
};

// @route   PUT '/api/comments/:commentId'
// @desc    Edit a specific comment/reply
// @access  private
const editComment = async (req, res) => {
  try {
    const getAComment = await getComment(req.params.commentId);

    if (!getAComment) {
      return serverResponse(res, 404, { message: "Comment doesn't exist" });
    }

    if (!requesterIsAuthenticatedUser(req.user.sub, getAComment.user)) {
      return serverResponse(res, 400, {
        message: 'Unauthorized!'
      });
    }

    const comment = await updateComment(req.params.commentId, req.body);

    return serverResponse(res, 200, comment);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to edit a comment'
    });
  }
};

module.exports = {
  getCommentsOfAPost,
  getRepliesOfAComment,
  addCommentToPost,
  addReplyToComment,
  removeAComment,
  editComment
};
