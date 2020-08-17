const Activity = require('../models/Activity.js');
const Post = require('../models/Post.js');

function addActivity(activity) {
  activity = new Activity(activity);
  return activity.save();
}

function getUserActivity(userId) {
  return Activity.find({ referredUser: userId })
    .populate('activities.user', 'username profilePic')
    .populate('referredEntity', 'media')
    .populate({ path: 'referredEntity', populate: { path: 'post', select: 'media' } })
    .sort('-created');
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
