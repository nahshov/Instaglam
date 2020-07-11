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
  const { user, post, comment } = like;
  const doesLikeExist = await Like.findOne({ user, post, comment });
  if (doesLikeExist) {
    return;
  }
  like = new Like(like);
  return like.save();
}

function removeLikeFromPost(userId) {
  return Like.findOneAndRemove({ user: userId });
}

function removeLikeFromComment(userId) {
  return Like.findOneAndRemove({ user: userId });
}

function removeAllUserLikes(userId) {
  return Like.deleteMany({ user: userId });
}

module.exports = {
  getPostLikes,
  getCommentLikes,
  addLikeToPost,
  addLikeToComment,
  removeLikeFromPost,
  removeLikeFromComment,
  removeAllUserLikes
};
