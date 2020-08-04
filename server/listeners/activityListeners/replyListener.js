const { activityEmitter } = require('../../events/events');
const { addActivity } = require('../../services/activity-services');

let replies = {};
let nextRepliesCheck = false;

function checkReplies() {
  if (!nextRepliesCheck) {
    nextRepliesCheck = true;
    setTimeout(() => {
      const activities = Object.values(replies);
      replies = {};
      activities.map(addActivity);
      nextRepliesCheck = false;
    }, 30000);
  }
}

const replyListener = activityEmitter.on('reply', payload => {
  const {
    comment, commentBy, replier, created, replyId
  } = payload;

  if (!replies[comment]) {
    replies[comment] = {
      created,
      referredUser: commentBy,
      referredEntity: comment,
      referredEntityType: 'comment',
      activityType: 'reply',
      activities: []
    };
  }
  replies[comment].activities.push({
    user: replier,
    created,
    activityId: replyId
  });

  checkReplies();
});

module.exports = {
  replyListener
};
