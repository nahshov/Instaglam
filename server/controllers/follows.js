const {
  getFollow,
  getUserFollowers,
  getUserFollowing,
  addFollowToUser,
  removeFollowFromUser
} = require('../services/follow-services');
const { followListener, removeFollowListener } = require('../listeners/activityListeners/followListeners');
const { activityEmitter } = require('../events/events');
const serverResponse = require('../utils/serverResponse');
const { isFollowed } = require('../services/follow-services');

// @route   GET '/api/users/:userId/follows/followers'
// @desc    Get followers list of a user
// @access  private
const getUserFollowersList = async (req, res) => {
  try {
    const follows = await getUserFollowers(req.params.userId);
    const newFollowsPromisesArr = follows.map(async f => ({
      ...f,
      isFollowed: await isFollowed(req.user.sub, f._id)
    }));

    const newFollows = await Promise.all(newFollowsPromisesArr);

    return serverResponse(res, 200, newFollows);
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
    const newFollowsPromisesArr = follows.map(async f => ({
      ...f,
      isFollowed: await isFollowed(req.user.sub, f._id)
    }));
    const newFollows = await Promise.all(newFollowsPromisesArr);
    return serverResponse(res, 200, newFollows);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to get following list'
    });
  }
};

// @route   POST '/api/users/:userId/follows'
// @desc    Add a follow to a user
// @access  private
const addFollowToAUser = async (req, res) => {
  try {
    const follow = await addFollowToUser({
      user: req.user.sub,
      following: req.params.userId
    });

    await followListener;

    activityEmitter.emit('follow', {
      following: req.params.userId,
      follower: req.user.sub,
      followId: follow._id,
      created: new Date()
    });

    return serverResponse(res, 200, follow);
  } catch (error) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to add a follow'
    });
  }
};

// @route   DELETE '/api/users/:userId/follows'
// @desc    Remove a follow from a user
// @access  private
const removeFollow = async (req, res) => {
  try {
    const follow = await getFollow(req.user.sub);

    if (!follow) {
      return serverResponse(res, 404, { message: "Follow doesn't exist" });
    }

    await removeFollowFromUser(
      req.params.userId,
      req.user.sub
    );

    await removeFollowListener;

    activityEmitter.emit('removeFollow', { followId: follow._id, following: req.params.userId });

    return serverResponse(res, 200, { message: 'successfully removed follow' });
  } catch (error) {
    return serverResponse(res, 500, {
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
