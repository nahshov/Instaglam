const { activityEmitter } = require('../../events/events');
const { addActivity, removeActivity } = require('../../services/activity-services');

let comments = {};
let nextCommentsCheck = false;

function checkComments() {
  if (!nextCommentsCheck) {
    nextCommentsCheck = true;
    setTimeout(() => {
      const activities = Object.values(comments);
      comments = {};
      activities.map(addActivity);
      nextCommentsCheck = false;
    }, 30000);
  }
}

const commentListener = activityEmitter.on('comment', payload => {
  const {
    post, postBy, commenter, created, commentId
  } = payload;

  if (!comments[post]) {
    comments[post] = {
      created,
      referredUser: postBy,
      referredEntity: post,
      referredEntityType: 'Post',
      activityType: 'comment',
      activities: []
    };
  }
  comments[post].activities.push({
    user: commenter,
    created,
    activityId: commentId
  });

  checkComments();
});

const removeCommentListener = activityEmitter.on('deleteComment', async commentId => {
  await removeActivity(commentId);
});

module.exports = {
  commentListener,
  removeCommentListener
};
