const {
  getUserFollowers,
  getUserFollowing,
  addFollowToUser,
  removeFollowFromUser
} = require('../services/follow-services');
const serverResponse = require('../utils/serverResponse');
const { getUser } = require('../services/user-services');

// @route   GET '/api/users/:userId/follows/followers'
// @desc    Get followers list of a user
// @access  private
const getUserFollowersList = async (req, res) => {
  try {
    const follows = await getUserFollowers(req.params.userId);
    return serverResponse(res, 200, follows);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to get followers list'
    });
  }
};

// @route   GET '/api/users/:userId/follows/following'
// @desc    Get following list of a user
// @access  private
const getUserFollowingList = async (req, res) => {
  try {
    const follows = await getUserFollowing(req.params.userId);
    return serverResponse(res, 200, follows);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to get following list'
    });
  }
};

// @route   POST '/api/users/:userId/follows'
// @desc    Add a follow to a user's followers list and to a user's following list
// @access  private
const addFollowToAUser = async (req, res) => {
  try {
    const follow = await addFollowToUser({
      user: req.user.sub,
      following: req.params.userId
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
// @desc    Remove a follow from a user's followers list and from a user's following list
// @access  private
const removeFollow = async (req, res) => {
  try {
    const removeFollowFromAUser = await removeFollowFromUser(
      req.params.userId,
      req.user.sub
    );
    // const RemoveFromUserFollowingList = await removeFromFollowingList(
    //   req.params.userId,
    //   req.user.sub
    // );
    return serverResponse(res, 200, {
      removeFollowFromAUser
    });
  } catch (error) {
    return serverResponse(res, 200, {
      message: 'Internal error while trying to remove a follow'
    });
  }
};

module.exports = {
  getUserFollowersList,
  getUserFollowingList,
  addFollowToAUser,
  removeFollow
};
