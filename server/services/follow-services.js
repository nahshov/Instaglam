const Follow = require('../models/Follow.js');

async function getUserFollowing(userId) {
  const follows = await Follow.find({ user: userId }).populate('following');
  const followingList = follows.map((user) => {
    return {
      username: user.following.username,
      fullName: user.following.fullName,
      profilePic: user.following.profilePic
    };
  });
  return followingList;
}

async function getUserFollowers(userId) {
  const follows = await Follow.find({ following: userId }).populate('user');
  const followerList = follows.map((follow) => {
    return {
      username: follow.user.username,
      fullName: follow.user.fullName,
      profilePic: follow.user.profilePic
    };
  });
  return followerList;
}

async function addFollowToUser(follow) {
  const { user, following } = follow;
  const doesFollowExist = await Follow.findOne({
    user,
    following
  });
  if (doesFollowExist) {
    return;
  }
  if (follow.user === follow.following) {
    return 'You cannot follow yourself.';
  }
  follow = new Follow(follow);
  return follow.save();
}

function removeFollowFromUser(userId, userFollowingId) {
  return Follow.findOneAndRemove({
    user: userFollowingId,
    following: userId
  });
}

function removeAllUserFollowers(userId) {
  return Follow.deleteMany({ user: userId });
}

module.exports = {
  getUserFollowers,
  getUserFollowing,
  addFollowToUser,
  removeFollowFromUser,
  removeAllUserFollowers
};
