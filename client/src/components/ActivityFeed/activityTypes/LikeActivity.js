import React from 'react';

const LikeActivity = ({ profilePic, usernames, activityLength, referredEntityType }) => {
  let LikeActivityText;

  if (referredEntityType === 'post') {
    if (activityLength > 2) {
      LikeActivityText = `${usernames[0]}, ${usernames[1]} and ${activityLength - 2}
      more liked your post.`;
    } else if (activityLength === 2) {
      LikeActivityText = `${usernames[0]} and ${usernames[1]} liked your post.`;
    } else {
      LikeActivityText = `${usernames} liked your post.`;
    }
  } if (activityLength > 2) {
    LikeActivityText = `${usernames[0]}, ${usernames[1]} and ${activityLength - 2}
      more liked your comment.`;
  } else if (activityLength === 2) {
    LikeActivityText = `${usernames[0]} and ${usernames[1]} liked your comment.`;
  } else {
    LikeActivityText = `${usernames} liked your post.`;
  }

  return (
    <>
      <img src={profilePic} alt="):" />
      <span>{LikeActivityText}</span>
    </>
  );
};

export default LikeActivity;
