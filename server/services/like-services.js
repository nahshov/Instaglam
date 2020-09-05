const Like = require('../models/Like.js');
const { isFollowed } = require('./follow-services');

async function getPostLikers(postId, userId) {
  const likes = await Like.find({ post: postId }).populate('user', 'username profilePic');
  return Promise.all(
    likes
      .filter(like => !like.comment)
      .map(async like => (
        {
          ...like.user.toObject(),
          isFollowed: await isFollowed(userId, like.user._id)
        }
      ))
  );
}

async function getCommentLikers(commentId, userId) {
  const likes = await Like.find({ comment: commentId }).populate('user', 'username profilePic');
  return Promise.all(
    likes
      .filter(like => !like.post)
      .map(async like => (
        {
          ...like.user.toObject(),
          isFollowed: await isFollowed(userId, like.user._id)
        }
      ))
  );
}

async function getPostLikes(postId) {
  const likes = await Like.find({ post: postId }).populate('user', 'username profilePic');
  return likes.filter(like => !like.comment);
}

async function isPostLiked(userId, postId) {
  const like = await Like.findOne({ post: postId, user: userId });
  return !!like;
}

async function arePostsLiked(userId, postsIds) {
  const likes = await Like.find({ user: userId, post: { $in: postsIds } });
  return likes.reduce((result, like) => {
    result[like.post] = true;
    return result;
  }, {});
}

async function areCommentsLiked(userId, commentsIds) {
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

function removeLikeFromAPost(postId, userId) {
  return Like.findOneAndDelete({ post: postId, user: userId });
}

function removeLikeFromAComment(commentId, userId) {
  return Like.findOneAndDelete({ comment: commentId, user: userId });
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
  removeLikeFromAPost,
  removeLikeFromAComment,
  removeLikesFromPost,
  removeLikesFromComment,
  removeAllUserLikes,
  arePostsLiked,
  isPostLiked,
  areCommentsLiked,
  getPostLikers,
  getCommentLikers
};
