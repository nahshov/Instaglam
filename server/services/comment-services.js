const Comment = require('../models/Comment.js');

function getComment(commentId) {
  return Comment.findOne({ _id: commentId });
}

function getCommentsOfPost(postId, includeComments = undefined) {
  return Comment.find({ post: postId }, null, { limit: includeComments }).populate('user', 'username');
  ;
}

function getRepliesOfComment(commentId) {
  return Comment.find({ replyToComment: commentId });
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

function removeAllCommentReplies(commentId) {
  return Comment.deleteMany({ replyToComment: commentId });
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
  getComment,
  getCommentsOfPost,
  getRepliesOfComment,
  addComment,
  removeComment,
  removeAllPostComments,
  removeAllCommentReplies,
  removeAllUserComments,
  updateComment
};
