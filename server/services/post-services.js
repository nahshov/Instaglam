const Post = require('../models/Post.js');
const { deleteFromBucket } = require('../services/google-cloud');

// @desc: Get all posts of a user
// @route: /api/posts
function getAllPosts(limit = 10, skip = 0) {
  return Post.find({})
    .limit(+limit)
    .skip(+skip)
    .sort('-created');
}
// @desc: Get all posts of a user
// @route: /api/posts/:userId
function getAllPostsOfUser(userId) {
  return Post.find({ user: userId });
}

// @desc: Get one post of a user
// @route: /api/posts/singlePost/:postId
function getPost(postId) {
  return Post.findOne({ _id: postId });
}

// @desc: createPost
// @route: /api/posts
function createPost(post) {
  // Did not use Model.create to be consistent with userEmail services.
  post = new Post(post);
  return post.save();
}

// @desc: removePost
// @route: /api/posts/:id
function removePost(postId) {
  return Post.findOneAndRemove({ _id: postId });
}

// @desc: Remove all posts from a specific userEmail
// @route: DELETE /api/me
async function removeAllUserPosts(userId) {
  const posts = await getAllPostsOfUser(userId);
  const postPromisesArray = posts.map((post) => {
    deleteFromBucket(post.media);
  });
  await Promise.all(postPromisesArray);
  return Post.deleteMany({ user: userId });
}

// @desc: Update post
// @route: /api/posts/:id
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
  getAllPosts,
};
