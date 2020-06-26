const Comment = require('../models/Comment.js');

function getComments(postId) {
  return Comment.find({ post: postId });
}

function addComment(comment) {
  comment = new Comment(comment);
  return comment.save();
}

function removeComment(commentId) {
  return Comment.findOneAndRemove({ _id: commentId });
}

function removeAllPostComments(postId) {
  return Comment.deleteMany({ post: postId });
}

function removeAllUserComments(userId) {
  return Comment.deleteMany({ user: userId });
}

async function updateComment(commentId, newContent) {
  return Comment.findOneAndUpdate({ _id: commentId }, newContent, {
    new: true
  });
}

module.exports = {
  getComments,
  addComment,
  removeComment,
  removeAllPostComments,
  removeAllUserComments,
  updateComment
};
