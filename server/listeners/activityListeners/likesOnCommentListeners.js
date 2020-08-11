const { activityEmitter } = require('../../events/events');
const { addActivity, removeActivity } = require('../../services/activity-services');

let commentLikes = {};
let nextCommentLikesCheck = false;

function checkLikesOnComment() {
  if (!nextCommentLikesCheck) {
    nextCommentLikesCheck = true;
    setTimeout(() => {
      const activities = Object.values(commentLikes);
      commentLikes = {};
      activities.map(addActivity);
      nextCommentLikesCheck = false;
    }, 30000);
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
      referredEntityType: 'comment',
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

const removeLikeOnCommentListener = activityEmitter.on('deleteCommentLike', async likeId => {
  await removeActivity(likeId);
});

module.exports = {
  likesOnCommentListener,
  removeLikeOnCommentListener
};
