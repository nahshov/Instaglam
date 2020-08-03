const Activity = require('../models/Activity.js');

function addActivity(activity) {
  activity = new Activity(activity);
  return activity.save();
}

function getUserActivity(userId) {
  return Activity.find({ referredUser: userId });
}

module.exports = {
  addActivity,
  getUserActivity
};
