const Activity = require('../models/Activity.js');
const { isFollowed } = require('./follow-services');

function addActivity(activity) {
  activity = new Activity(activity);
  return activity.save();
}

async function getUserActivity(userId) {
  const users = await Activity.find({ referredUser: userId })
    .populate('activities.user', 'username profilePic')
    .populate('referredEntity', 'media')
    .populate({ path: 'referredEntity', populate: { path: 'post', select: 'media' } })
    .sort('-created');

  return Promise.all(users.map(user => async like => (
    {
      ...like.user.toObject(),
      isFollowed: await isFollowed(userId, like.user._id)
    }
  )));
}

function removeActivity(activityId) {
  return Activity.updateOne({ 'activities.activityId': activityId }, { $pull: { activities: { activityId } } });
}

function removeAllUserActivities(userId) {
  return Activity.updateMany({ 'activities.user': userId }, { $pull: { activities: { user: userId } } });
}

function removeAllUserActivitiesFeed(userId) {
  return Activity.deleteMany({ referredUser: userId });
}

module.exports = {
  addActivity,
  getUserActivity,
  removeActivity,
  removeAllUserActivitiesFeed,
  removeAllUserActivities
};
