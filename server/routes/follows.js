const verifyUser = require('../middleware/verifyUser');

const {
  getFollowersOfUser,
  addFollowToAUser,
  removeFollowFromAUser
} = require('../controllers/follows');

module.exports = function (app) {
  app
    .get('/api/users/:userId/followers', verifyUser, getFollowersOfUser)
    .post('/api/users/:userId/followers', verifyUser, addFollowToAUser)
    .delete('/api/users/:userId/followers', verifyUser, removeFollowFromAUser);
};
