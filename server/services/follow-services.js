const Follow = require('../models/Follow.js');

async function getUserFollowing(userId) {
  const follows = await Follow.find({ user: userId }).populate('following');
  const followingList = follows.map((follow) => ({
    username: follow.following.username,
    fullName: follow.following.fullName,
    profilePic: follow.following.profilePic,
    created: follow.created
  }));
  return followingList;
}

async function getUserFollowers(userId) {
  const follows = await Follow.find({ following: userId }).populate('user');
  const followerList = follows.map((follow) => ({
    username: follow.user.username,
    fullName: follow.user.fullName,
    profilePic: follow.user.profilePic,
    created: follow.created
  }));
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

function removeAllUserFollowings(userId) {
  return Follow.deleteMany({ following: userId });
}

function removeAllUserFollowers(userId) {
  return Follow.deleteMany({ user: userId });
}

module.exports = {
  getUserFollowers,
  getUserFollowing,
  addFollowToUser,
  removeFollowFromUser,
  removeAllUserFollowings,
  removeAllUserFollowers
};
