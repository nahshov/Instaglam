const {
  getComments,
  addComment,
  removeComment,
  updateComment,
} = require('../services/comment-services');

const { getPost } = require('../services/post-services');

const verifyUser = require('../services/auth-services');

module.exports = function (app) {
  // get all comments of a specific post
  app.get('/api/posts/:postId/comments', verifyUser, async (req, res) => {
    try {
      const comments = await getComments(req.params.postId);
      res.status(200).json(comments).end();
    } catch (error) {
      res
        .status(500)
        .json({
          message: `internal error while trying to get all comments for this post`,
        })
        .end();
    }
  });

  // Add comments to a post
  app.post('/api/posts/:postId/comments', verifyUser, async (req, res) => {
    try {
      const comment = {
        ...req.body,
        user: req.user.sub,
        post: req.params.postId,
      };
      const response = await addComment(comment);
      res.status(200).json(response).end();
    } catch (error) {
      res
        .status(500)
        .json({
          message: `internal error while trying to add a comment`,
        })
        .end();
    }
  });

  // Remove a single comment from a post
  app.delete(
    '/api/posts/:postId/comments/:commentId',
    verifyUser,
    async (req, res) => {
      try {
        const comment = await removeComment(req.params.commentId);
        res.status(200).json(comment).end();
      } catch (error) {
        res
          .status(500)
          .json({
            message: `internal error while trying to remove a comment`,
          })
          .end();
      }
    }
  );

  //update a comment in a post
  app.put(
    '/api/posts/:postId/comments/:commentId',
    verifyUser,
    async (req, res) => {
      try {
        const comment = await updateComment(req.params.commentId, req.body);
        res.status(200).json(comment).end();
      } catch (error) {
        res
          .status(500)
          .json({
            message: `internal error while trying to update comment`,
          })
          .end();
      }
    }
  );
};
