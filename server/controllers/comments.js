const {
  getComments,
  addComment,
  removeComment,
  updateComment
} = require('../services/comment-services');

const { getPost } = require('../services/post-services');
const serverResponse = require('../utils/serverResponse');

// @route   GET '/api/posts/:postId/comments'
// @desc    get all comments of a specific post
// @access  private
const getCommentsOfPost = async (req, res) => {
  try {
    const comments = await getComments(req.params.postId);
    return serverResponse(res, 200, comments);
  } catch (e) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to get all comments for this post'
    });
  }
};

// @route   POST '/api/posts/:postId/comments'
// @desc    add a comment to a post
// @access  private
const addCommentToPost = async (req, res) => {
  try {
    const comment = {
      ...req.body,
      user: req.user.sub,
      post: req.params.postId
    };
    const post = await getPost(req.params.postId);
    post.comments++;
    await post.save();
    const response = await addComment(comment);
    return serverResponse(res, 200, response);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to add a comment'
    });
  }
};

// @route   DELETE '/api/posts/:postId/comments/:commentId'
// @desc    Remove a single comment from a post
// @access  private
const removeCommentFromPost = async (req, res) => {
  try {
    const comment = await removeComment(req.params.commentId);
    const post = await getPost(req.params.postId);
    post.comments--;
    await post.save();
    res.status(200).json(comment).end();
  } catch (error) {
    res
      .status(500)
      .json({
        message: `internal error while trying to remove a comment`
      })
      .end();
  }
};

const editCommentOfPost = async (req, res) => {
  try {
    const comment = await updateComment(req.params.commentId, req.body);
    res.status(200).json(comment).end();
  } catch (error) {
    res
      .status(500)
      .json({
        message: `internal error while trying to update comment`
      })
      .end();
  }
};

module.exports = {
  getCommentsOfPost,
  addCommentToPost,
  removeCommentFromPost,
  editCommentOfPost
};
