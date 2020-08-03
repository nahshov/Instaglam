const { activityEmitter } = require('../events/events');
const { addActivity } = require('../services/activity-services');

let follows = {};
let postLikes = {};
let commentLikes = {};
let comments = {};
let replies = {};
let nextCheck = false;

function checkFollows() {
  if (!nextCheck) {
    nextCheck = true;
    setTimeout(() => {
      const activities = Object.values(follows);
      follows = {};
      activities.map(addActivity);
      nextCheck = false;
    }, 30000);
  }
}

const activityFollowListener = activityEmitter.on('follow', payload => {
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

function checkLikesOnPost() {
  if (!nextCheck) {
    nextCheck = true;
    setTimeout(() => {
      const activities = Object.values(postLikes);
      postLikes = {};
      activities.map(addActivity);
      nextCheck = false;
    }, 30000);
  }
}

const activityLikesOnPostListener = activityEmitter.on('postLike', payload => {
  const {
    post, postBy, liker, created, likeId
  } = payload;

  if (!postLikes[post]) {
    postLikes[post] = {
      created,
      referredUser: postBy,
      referredEntity: post,
      referredEntityType: 'post',
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

function checkLikesOnComment() {
  if (!nextCheck) {
    nextCheck = true;
    setTimeout(() => {
      const activities = Object.values(commentLikes);
      commentLikes = {};
      activities.map(addActivity);
      nextCheck = false;
    }, 30000);
  }
}

const activityLikesOnCommentListener = activityEmitter.on('commentLike', payload => {
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

function checkComments() {
  if (!nextCheck) {
    nextCheck = true;
    setTimeout(() => {
      const activities = Object.values(comments);
      comments = {};
      activities.map(addActivity);
      nextCheck = false;
    }, 30000);
  }
}

const activityCommentListener = activityEmitter.on('comment', payload => {
  const {
    post, postBy, commenter, created, commentId
  } = payload;

  if (!comments[post]) {
    comments[post] = {
      created,
      referredUser: postBy,
      referredEntity: post,
      referredEntityType: 'post',
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

function checkReplies() {
  if (!nextCheck) {
    nextCheck = true;
    setTimeout(() => {
      const activities = Object.values(replies);
      replies = {};
      activities.map(addActivity);
      nextCheck = false;
    }, 30000);
  }
}

const activityReplyListener = activityEmitter.on('reply', payload => {
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
  activityFollowListener,
  activityLikesOnPostListener,
  activityLikesOnCommentListener,
  activityCommentListener,
  activityReplyListener
};
