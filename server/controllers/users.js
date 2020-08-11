const {
  getUser: getUserService,
  getUsers: getUsersService,
  deleteUser,
  editUser
} = require('../services/user-services.js');

const { removeAllUserPosts } = require('../services/post-services.js');
const { removeAllUserComments } = require('../services/comment-services.js');
const { removeAllUserLikes } = require('../services/like-services.js');
const {
  removeAllUserFollowings,
  removeAllUserFollowers
} = require('../services/follow-services');
const { removeAllUserActivitiesFeed, removeAllUserActivities } = require('../services/activity-services');
const { deleteFile, uploadFile } = require('../services/cloud-services');
const { getUserFollowersCount, getUserFollowingCount, isFollowed } = require('../services/follow-services');
const serverResponse = require('../utils/serverResponse');
const formatImage = require('../utils/formatMedia.js');

// @route   GET '/api/users/:userInfo'
// @desc    Get user by email/username
// @access  private
const getUser = async (req, res) => {
  try {
    const user = await getUserService(req.params.userInfo);
    const [following, followers, doesFollowExist] = await Promise.all(
      [
        getUserFollowingCount(user._id),
        getUserFollowersCount(user._id),
        isFollowed(req.user.sub, user._id)
      ]
    );

    if (!user) {
      return serverResponse(res, 404, {
        message: 'No user with requested email'
      });
    }

    return serverResponse(
      res,
      200,
      {
        ...user.toJSON(),
        numOfFollowing: following,
        numOfFollowers: followers,
        isFollowed: doesFollowExist
      }
    );
  } catch (e) {
    return serverResponse(res, 500);
  }
};

// @route   GET '/api/users/search/:userInfo'
// @desc    Get users by email/username
// @access  private
const getUsers = async (req, res) => {
  try {
    const user = await getUsersService(req.params.userInfo);

    if (!user) {
      return serverResponse(res, 404, {
        message: 'No user with requested email'
      });
    }

    return serverResponse(res, 200, user);
  } catch (e) {
    return serverResponse(res, 500);
  }
};

// @route   GET '/api/me'
// @desc    Get authenticated user's profile
// @access  private
const getProfile = async (req, res) => {
  try {
    const user = await getUserService(req.user.email);
    const [following, followers] = await Promise.all(
      [getUserFollowingCount(user._id), getUserFollowersCount(user._id)]
    );

    return serverResponse(
      res,
      200,
      { ...user.toJSON(), numOfFollowing: following, numOfFollowers: followers }
    );
  } catch (e) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to find user'
    });
  }
};

// @route   PUT '/api/me'
// @desc    Edit authenticated user's profile
// @access  private
const editProfile = async (req, res) => {
  try {
    const user = await editUser(req.user.email, req.body);
    if (!user) {
      return serverResponse(res, 404, {
        message: 'No user with requested email'
      });
    }
    return serverResponse(res, 200, {
      message: 'Your changes were successfull'
    });
  } catch (e) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to update user'
    });
  }
};

// @route   DELETE '/api/me'
// @desc    Delete authenticated user's profile
// @access  private
const deleteProfile = async (req, res) => {
  try {
    const user = await getUserService(req.user.email);
    if (user) {
      await Promise.all([
        removeAllUserComments(req.user.sub),
        removeAllUserLikes(req.user.sub),
        removeAllUserPosts(req.user.sub),
        removeAllUserFollowings(req.user.sub),
        removeAllUserFollowers(req.user.sub),
        removeAllUserActivitiesFeed(req.user.sub),
        removeAllUserActivities(req.user.sub),
        deleteUser(req.user.email)
      ]);

      return serverResponse(res, 200, { message: 'User successfully deleted' });
    }

    return serverResponse(res, 404, { message: 'User not found' });
  } catch (e) {
    console.log(e);
    return serverResponse(res, 500, {
      message: 'Internal error while trying to delete user'
    });
  }
};

// @route   POST '/api/me/profilePic'
// @desc    Upload and replace profile picture
// @access  private
const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) throw new Error('Could not receive file');
    const buffer = await formatImage(req.file, 300);

    const [imgUrl, user] = await Promise.all([
      uploadFile(req.file.originalname, buffer),
      getUserService(req.user.email)
    ]);

    user.profilePic = `${imgUrl}`;
    await user.save();
    return serverResponse(res, 200, {
      message: 'Profile picture successfully uploaded!'
    });
  } catch (e) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to upload profile picture'
    });
  }
};

// @route   GET '/api/me/profilePic'
// @desc    Get profile picture
// @access  private
const getProfilePic = async (req, res) => {
  try {
    const user = await getUserService(req.user.email);
    if (!user.profilePic) {
      return serverResponse(res, 404, { message: 'No profile picture found' });
    }
    return serverResponse(res, 200, { profilePic: user.profilePic });
  } catch (e) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to get profile picture'
    });
  }
};

// @route   DELETE '/api/me/profilePic'
// @desc    Delete profile picture
// @access  private
const deleteProfilePic = async (req, res) => {
  try {
    const user = await getUserService(req.user.email);
    if (!user.profilePic) {
      return serverResponse(res, 404, { message: 'No profile picture found' });
    }

    const imgUrl = user.profilePic;

    user.profilePic = 'https://www.gravatar.com/avatar/9e7800080252bd18b5a7cffe2f4d54a1?s=180&r=pg&d=mm';

    await Promise.all([deleteFile(imgUrl), user.save()]);
    return serverResponse(res, 200, {
      message: 'Successfully deleted profile picture'
    });
  } catch (e) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to delete profile picture'
    });
  }
};

module.exports = {
  getUser,
  getUsers,
  getProfile,
  editProfile,
  deleteProfile,
  uploadProfilePic,
  getProfilePic,
  deleteProfilePic
};
