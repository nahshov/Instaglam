const verifyUser = require('../middleware/verifyUser');
const { upload } = require('../middleware/fileUpload');
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
    .post('/api/posts', verifyUser, upload('media'), submitPost)
    .get('/api/posts/:userInfo', verifyUser, getPostsOfAUser)
    .delete('/api/posts/:postId', verifyUser, deletePost)
    .put('/api/posts/:postId', verifyUser, editPost)
    .get('/api/posts/singlePost/:postId', verifyUser, getOnePost);
};
