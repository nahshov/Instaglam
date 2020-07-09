const {
  getUserFollowers,
  addFollowToUser,
  removeFollowFromUser
} = require('../services/follow-services');
const serverResponse = require('../utils/serverResponse');
const { getUser } = require('../services/user-services');

// @route   GET '/api/users/:userId/follows'
// @desc    Get follows of a user
// @access  private
const getFollowersOfUser = async (req, res) => {
  try {
    const follows = await getUserFollowers(req.params.userId);
    return serverResponse(res, 200, follows);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to get follows'
    });
  }
};

// @route   POST '/api/users/:userId/follows'
// @desc    Add a follow to a user
// @access  private
const addFollowToAUser = async (req, res) => {
  try {
    const follow = await addFollowToUser({
      user: req.params.userId,
      userFollowing: req.user.sub
    });
    const user = await getUser(req.user.email);
    return serverResponse(res, 200, follow, user.username);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to add a follow'
    });
  }
};

// @route   DELETE '/api/users/:userId/follows'
// @desc    Remove a follow from a specific user
// @access  private
const removeFollowFromAUser = async (req, res) => {
  try {
    const follow = await removeFollowFromUser(req.params.userId, req.user.sub);
    return serverResponse(res, 200, follow);
  } catch (error) {
    return serverResponse(res, 200, {
      message: 'Internal error while trying to remove a follow'
    });
  }
};

module.exports = {
  getFollowersOfUser,
  addFollowToAUser,
  removeFollowFromAUser
};
