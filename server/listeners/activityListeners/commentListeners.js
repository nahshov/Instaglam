const { activityEmitter } = require('../../events/events');
const { addActivity, removeActivity } = require('../../services/activity-services');
const { activityInterval } = require('../../config/index');

let comments = {};
let nextCommentsCheck = false;

const revertCommentActivity = (commentId, postId) => comments[postId].activities
  .filter(activity => commentId.toString() !== activity.activityId.toString());

function checkComments() {
  if (!nextCommentsCheck) {
    nextCommentsCheck = true;
    setTimeout(() => {
      const activities = Object.values(comments);
      comments = {};
      activities.map(addActivity);
      nextCommentsCheck = false;
    }, activityInterval);
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

const removeCommentListener = activityEmitter.on('deleteComment', async ({ commentId, postId }) => {
  try {
    await removeActivity(commentId);
    if (!comments[postId]) return;
    comments[postId].activities = revertCommentActivity(commentId, postId);
    if (comments[postId].activities.length === 0) {
      delete comments[postId];
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  commentListener,
  removeCommentListener
};
