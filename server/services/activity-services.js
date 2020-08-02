const Activity = require('../models/Activity.js');
const { activityEmitter } = require('../events/events');

activityEmitter.on('follow', payload => {
  // letapel ba davar aze
  const {
    following,
    referredeEntityType,
    activityType,
    activity,
    created
  } = payload;
  addActivity({
    referredUser: following,
    referredeEntityType,
    activityType,
    activities: activity,
    created
  });
});

function addActivity(activity) {
  activity = new Activity(activity);
  return activity.save();
}

function getUserActivity(userId) {
  return Activity.findOne({ user: userId });
}

module.exports = {
  addActivity,
  getUserActivity
};
