const Follow = require('../models/Follow.js');

async function getUserFollowers(userId) {
  const follows = await Follow.find({ user: userId }).populate(
    'userFollowing',
    'username'
  );
  const followersList = follows.map((follow) => follow.userFollowing.username);
  return followersList;
}

async function addFollowToUser(follow) {
  const { user, userFollowing } = follow;
  const doesFollowExist = await Follow.findOne({ user, userFollowing });
  if (doesFollowExist) {
    return;
  }
  if (follow.user === follow.userFollowing) {
    return 'You cannot follow yourself.';
  }
  follow = new Follow(follow);
  return follow.save();
}

function removeFollowFromUser(userId, userFollowingId) {
  return Follow.findOneAndRemove({
    user: userId,
    userFollowing: userFollowingId
  });
}

function removeAllUserFollowers(userId) {
  return Follow.deleteMany({ user: userId });
}

module.exports = {
  getUserFollowers,
  addFollowToUser,
  removeFollowFromUser,
  removeAllUserFollowers
};
