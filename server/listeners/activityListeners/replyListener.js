const { activityEmitter } = require('../../events/events');
const { addActivity, removeActivity } = require('../../services/activity-services');
const { activityInterval } = require('../../config/index');

let replies = {};
let nextRepliesCheck = false;

const revertReplyActivity = (replyId, commentId) => replies[commentId].activities
  .filter(activity => replyId.toString() !== activity.activityId.toString());

function checkReplies() {
  if (!nextRepliesCheck) {
    nextRepliesCheck = true;
    setTimeout(() => {
      const activities = Object.values(replies);
      replies = {};
      activities.map(addActivity);
      nextRepliesCheck = false;
    }, activityInterval);
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
      referredEntityType: 'Comment',
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

const removeReplyListener = activityEmitter.on('deleteReply', async ({ replyId, commentId }) => {
  try {
    await removeActivity(replyId);
    if (!replies[commentId]) return;
    replies[commentId].activities = revertReplyActivity(replyId, commentId);
    if (replies[commentId].activities.length === 0) {
      delete replies[commentId];
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  replyListener,
  removeReplyListener
};
