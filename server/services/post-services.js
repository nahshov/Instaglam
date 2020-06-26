const Post = require('../models/Post.js');
const { deleteFile } = require('./cloud-services');

function getAllPosts(limit = 10, skip = 0) {
  return Post.find({})
    .limit(+limit)
    .skip(+skip)
    .sort('-created');
}

function getAllPostsOfUser(userId) {
  return Post.find({ user: userId });
}

function getPost(postId) {
  return Post.findOne({ _id: postId });
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
  const postPromisesArray = posts.map((post) => deleteFile(post.media));
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
