const Activity = require('../models/Activity.js');
const { isFollowed } = require('./follow-services');

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

  const noEmptyActivitiesArr = activities.filter(activity => activity.activities.length !== 0);

  return Promise.all(noEmptyActivitiesArr.map(async activity => ({
    ...activity.toObject(),
    isFollowed: await isFollowed(userId, activity.activities[0].user._id)
  })));
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

// async function clearActivities() {
//   const activitiesArr = await Activity.find({});
//   activitiesArr.forEach(doc => {
//     if (doc.activities.length === 0) {
//     }
//   });
//   return activitiesArr;
// }

// clearActivities();

module.exports = {
  addActivity,
  getUserActivity,
  removeActivity,
  removeAllUserActivitiesFeed,
  removeAllUserActivities
};
