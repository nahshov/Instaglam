const verifyUser = require('../middleware/verifyUser');

const {
  getLikesOfPost,
  addLikeToAPost,
  deleteLikeFromAPost,
  getLikesOfComment,
  addLikeToAComment,
  deleteLikeFromAComment,
  getLikersOfPost,
  getLikersOfComment
} = require('../controllers/likes');

module.exports = function (app) {
  app
    .get('/api/posts/:postId/likes', verifyUser, getLikesOfPost)
    .get('/api/posts/:postId/likes/users', verifyUser, getLikersOfPost)
    .post('/api/posts/:postId/likes', verifyUser, addLikeToAPost)
    .delete('/api/posts/:postId/likes', verifyUser, deleteLikeFromAPost);

  app
    .get('/api/comments/:commentId/likes', verifyUser, getLikesOfComment)
    .get('/api/comments/:commentId/likes/users', verifyUser, getLikersOfComment)
    .post('/api/comments/:commentId/likes', verifyUser, addLikeToAComment)
    .delete(
      '/api/comments/:commentId/likes',
      verifyUser,
      deleteLikeFromAComment
    );
};
