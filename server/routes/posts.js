const verifyUser = require('../middleware/verifyUser');
const { uploadPost } = require('../middleware/fileUpload');
const {
  submitPost,
  getPosts,
  getPostsOfAUser,
  getOnePost,
  deletePost,
  editPost
} = require('../controllers/posts.js');

module.exports = function (app) {
  // create a post
  app
    .get('/api/posts', verifyUser, getPosts)
    .post('/api/posts', verifyUser, uploadPost.single('media'), submitPost)
    .get('/api/posts/:userId', verifyUser, getPostsOfAUser)
    .delete('/api/posts/:postId', verifyUser, deletePost)
    .put('/api/posts/:postId', verifyUser, editPost)
    .get('/api/posts/singlePost/:postId', verifyUser, getOnePost);
};
