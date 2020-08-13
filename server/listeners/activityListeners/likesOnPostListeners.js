const { activityEmitter } = require('../../events/events');
const { addActivity, removeActivity } = require('../../services/activity-services');

let postLikes = {};
let nextPostLikesCheck = false;

function checkLikesOnPost() {
  if (!nextPostLikesCheck) {
    nextPostLikesCheck = true;
    setTimeout(() => {
      const activities = Object.values(postLikes);
      postLikes = {};
      activities.map(addActivity);
      nextPostLikesCheck = false;
    }, 30000);
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

const removeLikeOnPostListener = activityEmitter.on('deletePostLike', async likeId => {
  await removeActivity(likeId);
});

module.exports = {
  likesOnPostListener,
  removeLikeOnPostListener
};
