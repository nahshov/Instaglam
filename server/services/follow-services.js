const Follow = require('../models/Follow.js');

async function getUserFollowing(userId) {
  const follows = await Follow.find({ userDoingFollow: userId }).populate(
    'userFollowingList'
  );
  const followingList = follows.map((follow) => {
    return {
      username: follow.userFollowingList.username,
      fullName: follow.userFollowingList.fullName,
      profilePic: follow.userFollowingList.profilePic
    };
  });
  return followingList;
}

async function getUserFollowers(userId) {
  const follows = await Follow.find({ userGettingFollowed: userId }).populate(
    'userFollowersList'
  );
  const followersList = follows.map((follow) => {
    return {
      username: follow.userFollowersList.username,
      fullName: follow.userFollowersList.fullName,
      profilePic: follow.userFollowersList.profilePic
    };
  });
  return followersList;
}

async function addUserToFollowingList(following) {
  const { userDoingFollow, userFollowingList } = following;
  const doesFollowExist = await Follow.findOne({
    userDoingFollow,
    userFollowingList
  });
  if (doesFollowExist) {
    return;
  }
  if (following.userDoingFollow === following.userFollowingList) {
    return 'You cannot follow yourself.';
  }
  following = new Follow(following);
  return following.save();
}

async function addFollowToUser(followed) {
  const { userGettingFollowed, userFollowersList } = followed;
  const doesFollowExist = await Follow.findOne({
    userGettingFollowed,
    userFollowersList
  });
  if (doesFollowExist) {
    return;
  }
  if (followed.userGettingFollowed === followed.userFollowersList) {
    return 'You cannot follow yourself.';
  }
  followed = new Follow(followed);

  return followed.save();
}

function removeFromFollowingList(userId, userFollowingId) {
  return Follow.findOneAndRemove({
    userDoingFollow: userFollowingId,
    userFollowingList: userId
  });
}

function removeFollowFromUser(userId, userFollowingId) {
  return Follow.findOneAndRemove({
    userGettingFollowed: userId,
    userFollowersList: userFollowingId
  });
}

function removeAllUserFollowings(userId) {
  return Follow.deleteMany({ userFollowingList: userId });
}

function removeAllUserFollowers(userId) {
  return Follow.deleteMany({ userFollowersList: userId });
}

module.exports = {
  getUserFollowers,
  getUserFollowing,
  addUserToFollowingList,
  addFollowToUser,
  removeFollowFromUser,
  removeFromFollowingList,
  removeAllUserFollowings,
  removeAllUserFollowers
};
