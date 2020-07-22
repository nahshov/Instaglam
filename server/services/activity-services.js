const Activity = require('../models/Activity.js');
const { activityEmitter } = require('../events/events');

activityEmitter.on('follow', payload => {
  // letapel ba davar aze
  const { followee, follower, created } = payload;
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
