const Like = require('../models/Like.js');

async function getPostLikes(postId) {
  const likes = await Like.find({ post: postId }).populate('user', 'username profilePic');
  return likes.filter(like => !like.comment);
}

async function userHasLikes(userId, postId) {
  const like = await Like.findOne({ post: postId, user: userId });
  return !!like;
}

async function isPostLiked(userId, postsIds) {
  const likes = await Like.find({ user: userId, post: { $in: postsIds } });
  return likes.reduce((result, like) => {
    result[like.post] = true;
    return result;
  }, {});
}

async function isCommentLiked(userId, commentsIds) {
  const likes = await Like.find({ user: userId, comment: { $in: commentsIds } });
  return likes.reduce((result, like) => {
    result[like.comment] = true;
    return result;
  }, {});
}

function getCommentLikes(commentId) {
  return Like.find({ comment: commentId });
}

async function addLikeToPost(like) {
  const { user, post } = like;
  const doesLikeExist = await Like.findOne({ user, post });
  if (doesLikeExist) {
    return;
  }
  like = new Like(like);
  return like.save();
}

async function addLikeToComment(like) {
  const { user, comment } = like;
  const doesLikeExist = await Like.findOne({ user, comment });
  if (doesLikeExist) {
    return;
  }
  like = new Like(like);
  return like.save();
}

function removeLike(postId, userId) {
  return Like.deleteOne({ post: postId, user: userId });
}
function removeLikeFromComment(commentId, userId) {
  return Like.deleteOne({ comment: commentId, user: userId });
}

function removeLikesFromPost(postId) {
  return Like.deleteMany({ post: postId });
}

function removeLikesFromComment(commentId) {
  return Like.deleteMany({ comment: commentId });
}

function removeAllUserLikes(userId) {
  return Like.deleteMany({ user: userId });
}

module.exports = {
  getPostLikes,
  getCommentLikes,
  addLikeToPost,
  addLikeToComment,
  removeLike,
  removeLikeFromComment,
  removeLikesFromPost,
  removeLikesFromComment,
  removeAllUserLikes,
  userHasLikes,
  isPostLiked,
  isCommentLiked
};
