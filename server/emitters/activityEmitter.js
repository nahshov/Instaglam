const { activityEmitter } = require('../events/events');
const { addActivity } = require('../services/activity-services');

let follows = {};
let nextCheck = false;

function checkFollows() {
  if (!nextCheck) {
    nextCheck = true;
    setTimeout(() => {
      const activities = Object.values(follows);
      follows = {};
      activities.map(addActivity);
      nextCheck = false;
    }, 30000);
  }
}

activityEmitter.on('follow', payload => {
  const {
    following, follower, created, followId
  } = payload;

  if (!follows[following]) {
    follows[following] = {
      created,
      referredUser: following,
      referredEntity: following,
      referredEntityType: 'user',
      activityType: 'follow',
      activities: []
    };
  }
  follows[following].activities.push({
    user: follower,
    created,
    activityId: followId
  });

  checkFollows();
});
