const Activity = require('../models/Activity.js');

function addActivity(activity) {
  activity = new Activity(activity);
  return activity.save();
}

function getUserActivity(userId) {
  return Activity.find({ referredUser: userId }).populate('activities.user', 'username profilePic');
}

function removeAllUserActivitiesFeed(userId) {
  return Activity.deleteMany({ referredUser: userId });
}

function removeAllUserActivities(userId) {
  return Activity.deleteMany([{ activities: { $elemMatch: { $in: userId } } }]);
}

module.exports = {
  addActivity,
  getUserActivity,
  removeAllUserActivitiesFeed,
  removeAllUserActivities
};
