const verifyUser = require('../middleware/verifyUser');

const {
  getCommentsOfAPost,
  getRepliesOfAComment,
  addCommentToPost,
  addReplyToComment,
  removeAComment,
  editComment
} = require('../controllers/comments');

module.exports = function (app) {
  app
    .get('/api/comments/:commentId/replies', verifyUser, getRepliesOfAComment)
    .get('/api/posts/:postId/comments', verifyUser, getCommentsOfAPost)
    .post('/api/posts/:postId/comments', verifyUser, addCommentToPost)
    .post('/api/posts/:postId/comments/:commentId/replies', verifyUser, addReplyToComment)
    .put(
      '/api/comments/:commentId',
      verifyUser,
      editComment
    )
    .delete(
      '/api/posts/:postId/comments/:commentId',
      verifyUser,
      removeAComment
    );
};
