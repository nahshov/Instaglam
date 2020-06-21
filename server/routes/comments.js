const verifyUser = require('../middleware/verifyUser');

const {
  getCommentsOfPost,
  addCommentToPost,
  removeCommentFromPost,
  editCommentOfPost
} = require('../controllers/comments');

module.exports = function (app) {
  app
    .get('/api/posts/:postId/comments', verifyUser, getCommentsOfPost)
    .post('/api/posts/:postId/comments', verifyUser, addCommentToPost)
    .put(
      '/api/posts/:postId/comments/:commentId',
      verifyUser,
      editCommentOfPost
    )
    .delete(
      '/api/posts/:postId/comments/:commentId',
      verifyUser,
      removeCommentFromPost
    );
};
