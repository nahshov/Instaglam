const { activityEmitter } = require('../../events/events');
const { addActivity, removeActivity } = require('../../services/activity-services');
const { activityInterval } = require('../../config/index');

let follows = {};
let nextFollowCheck = false;

const revertFollowActivities = (followId, following) => follows[following].activities
  .filter(activity => followId.toString() !== activity.activityId.toString());

function checkFollows() {
  if (!nextFollowCheck) {
    nextFollowCheck = true;
    setTimeout(() => {
      const activities = Object.values(follows);
      follows = {};
      activities.map(addActivity);
      nextFollowCheck = false;
    }, activityInterval);
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
      referredEntityType: 'User',
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

const removeFollowListener = activityEmitter.on('removeFollow', async ({ followId, following }) => {
  await removeActivity(followId);
  if (!follows[following]) return;
  follows[following].activities = revertFollowActivities(followId, following);
  if (follows[following].activities.length === 0) {
    delete follows[following];
  }
});

module.exports = {
  followListener,
  removeFollowListener
};
