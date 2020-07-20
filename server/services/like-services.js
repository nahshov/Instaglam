const Like = require('../models/Like.js');

async function getPostLikes(postId) {
  const likes = await Like.find({ post: postId });
  return likes.filter(like => !like.comment);
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

function removeLike(likeId) {
  return Like.findOneAndRemove({ _id: likeId });
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
  removeLikesFromPost,
  removeLikesFromComment,
  removeAllUserLikes
};
