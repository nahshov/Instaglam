const Activity = require('../models/Activity.js');

function addActivity(activity) {
  activity = new Activity(activity);
  return activity.save();
}

async function getUserActivity(userId) {
  const activities = await Activity.find({ referredUser: userId })
    .populate('activities.user', 'username profilePic')
    .populate({ path: 'referredEntity', select: 'media', populate: { path: 'post', select: 'media' } })
    .populate('activities.activityId', 'content')
    .sort('-created');

  return activities.filter(activity => activity.activities.length !== 0);
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
