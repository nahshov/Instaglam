const { activityEmitter } = require('../../events/events');
const { addActivity } = require('../../services/activity-services');

let follows = {};
let nextFollowCheck = false;

function checkFollows() {
  if (!nextFollowCheck) {
    nextFollowCheck = true;
    setTimeout(() => {
      const activities = Object.values(follows);
      follows = {};
      activities.map(addActivity);
      nextFollowCheck = false;
    }, 30000);
  }
}

const followListener = activityEmitter.on('follow', payload => {
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

module.exports = {
  followListener
};
