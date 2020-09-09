const { activityEmitter } = require('../../events/events');
const { addActivity, removeActivity } = require('../../services/activity-services');
const { activityInterval } = require('../../config/index');

let postLikes = {};
let nextPostLikesCheck = false;

const revertLikeOnPostActivity = (likeId, postId) => postLikes[postId].activities
  .filter(activity => likeId.toString() !== activity.activityId.toString());

function checkLikesOnPost() {
  if (!nextPostLikesCheck) {
    nextPostLikesCheck = true;
    setTimeout(() => {
      const activities = Object.values(postLikes);
      postLikes = {};
      activities.map(addActivity);
      nextPostLikesCheck = false;
    }, activityInterval);
  }
}

const likesOnPostListener = activityEmitter.on('postLike', payload => {
  const {
    post, postBy, liker, created, likeId
  } = payload;

  if (!postLikes[post]) {
    postLikes[post] = {
      created,
      referredUser: postBy,
      referredEntity: post,
      referredEntityType: 'Post',
      activityType: 'like',
      activities: []
    };
  }
  postLikes[post].activities.push({
    user: liker,
    created,
    activityId: likeId
  });

  checkLikesOnPost();
});

const removeLikeOnPostListener = activityEmitter.on('deletePostLike', async ({ likeId, postId }) => {
  try {
    await removeActivity(likeId);
    if (!postLikes[postId]) return;
    postLikes[postId].activities = revertLikeOnPostActivity(likeId, postId);
    if (postLikes[postId].activities.length === 0) {
      delete postLikes[postId];
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  likesOnPostListener,
  removeLikeOnPostListener
};
