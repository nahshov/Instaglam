const verifyUser = require('../middleware/verifyUser');

const {
  getUserFollowersList,
  getUserFollowingList,
  addFollowToAUser,
  removeFollow
} = require('../controllers/follows');

module.exports = function (app) {
  app
    .get(
      '/api/users/:userId/follows/followers',
      verifyUser,
      getUserFollowersList
    )
    .get(
      '/api/users/:userId/follows/following',
      verifyUser,
      getUserFollowingList
    )
    .post('/api/users/:userId/follows', verifyUser, addFollowToAUser)
    .delete('/api/users/:userId/follows', verifyUser, removeFollow);
};
