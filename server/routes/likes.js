const verifyUser = require('../middleware/verifyUser');

const {
  getLikesOfPost,
  addLikeToAPost,
  deleteLikeFromAPost,
  getLikesOfComment,
  addLikeToAComment,
  deleteLikeFromAComment,
} = require('../controllers/likes');

module.exports = function (app) {
  app
    .get('/api/posts/:postId/likes', verifyUser, getLikesOfPost)
    .post('/api/posts/:postId/likes', verifyUser, addLikeToAPost)
    .delete('/api/posts/:postId/likes/', verifyUser, deleteLikeFromAPost);

  app
    .get('/api/comments/:commentId/likes', verifyUser, getLikesOfComment)
    .post('/api/comments/:commentId/likes', verifyUser, addLikeToAComment)
    .delete(
      '/api/comments/:commentId/likes',
      verifyUser,
      deleteLikeFromAComment,
    );
};
