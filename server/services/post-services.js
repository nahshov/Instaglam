const Post = require('../models/Post.js');
const { deleteFile } = require('./cloud-services');
const { getUser } = require('./user-services');

function getAllPosts(limit, skip) {
  return Post.find({})
    .limit(+limit)
    .skip(+skip)
    .sort('-created')
    .populate('user', 'profilePic username -_id');
}

async function getAllPostsOfUser(userInfo, limit) {
  const user = await getUser(userInfo);
  return Post.find({ user: user._id })
    .sort('-created').populate('user', 'profilePic username')
    .limit(+limit);
}

function getPost(postId) {
  return Post.findOne({ _id: postId })
    .populate('user', 'profilePic username');
}

function createPost(post) {
  post = new Post(post);
  return post.save();
}

function removePost(postId) {
  return Post.findOneAndRemove({ _id: postId });
}

async function removeAllUserPosts(userId) {
  const posts = await getAllPostsOfUser(userId);
  const postPromisesArray = posts.map(post => deleteFile(post.media));
  await Promise.all(postPromisesArray);
  return Post.deleteMany({ user: userId });
}

async function updatePost(postId, newContent) {
  return Post.findOneAndUpdate({ _id: postId }, newContent, { new: true });
}

module.exports = {
  getAllPostsOfUser,
  getPost,
  createPost,
  removePost,
  removeAllUserPosts,
  updatePost,
  getAllPosts
};
