const { activityEmitter } = require('../../events/events');
const { addActivity, removeActivity } = require('../../services/activity-services');
const { activityInterval } = require('../../config/index');

let commentLikes = {};
let nextCommentLikesCheck = false;

const revertLikeOnCommentActivity = (likeId, commentId) => commentLikes[commentId].activities
  .filter(activity => likeId.toString() !== activity.activityId.toString());

function checkLikesOnComment() {
  if (!nextCommentLikesCheck) {
    nextCommentLikesCheck = true;
    setTimeout(() => {
      const activities = Object.values(commentLikes);
      commentLikes = {};
      activities.map(addActivity);
      nextCommentLikesCheck = false;
    }, activityInterval);
  }
}

const likesOnCommentListener = activityEmitter.on('commentLike', payload => {
  const {
    comment, commentBy, liker, created, likeId
  } = payload;

  if (!commentLikes[comment]) {
    commentLikes[comment] = {
      created,
      referredUser: commentBy,
      referredEntity: comment,
      referredEntityType: 'Comment',
      activityType: 'like',
      activities: []
    };
  }
  commentLikes[comment].activities.push({
    user: liker,
    created,
    activityId: likeId
  });

  checkLikesOnComment();
});

const removeLikeOnCommentListener = activityEmitter.on('deleteCommentLike', async ({ likeId, commentId }) => {
  try {
    await removeActivity(likeId);
    if (!commentLikes[commentId]) return;
    commentLikes[commentId].activities = revertLikeOnCommentActivity(likeId, commentId);
    if (commentLikes[commentId].activities.length === 0) {
      delete commentLikes[commentId];
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  likesOnCommentListener,
  removeLikeOnCommentListener
};
