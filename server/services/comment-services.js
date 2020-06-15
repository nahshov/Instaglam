const Comment = require('../models/Comment.js');

// @desc: get comments of a post
// @route: /api/posts/:postId/comments
function getComments(postId) {
  return Comment.find({ post: postId });
}

// @desc: add comment to a post
// @route: /api/post/comments
function addComment(comment) {
  comment = new Comment(comment);
  return comment.save();
}

// @desc: remove a single comment from a post
// @route: /api/comments/:commentId
function removeComment(commentId) {
  return Comment.findOneAndRemove({ _id: commentId });
}

// @desc: remove all comments from a post
// @route: /api/posts/:postId/comments
function removeAllPostComments(postId) {
  return Comment.deleteMany({ post: postId });
}

// @desc: remove all comments of a user
// @route: /api/posts/:userId/comments
function removeAllUserComments(userId) {
  return Comment.deleteMany({ user: userId });
}

// @desc: update comment of a post
// @route: /api/comments/:postId
async function updateComment(commentId, newContent) {
  return Comment.findOneAndUpdate({ _id: commentId }, newContent, {
    new: true,
  });
}

module.exports = {
  getComments,
  addComment,
  removeComment,
  removeAllPostComments,
  removeAllUserComments,
  updateComment,
};
