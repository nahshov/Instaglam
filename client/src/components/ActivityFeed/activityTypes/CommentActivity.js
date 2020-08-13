import React from 'react';
import { activitiesPropTypes } from 'customPropTypes';

const CommentActivity = ({ profilePic, usernames, activityLength }) => {
  let CommentActivityText;

  if (activityLength > 2) {
    CommentActivityText = `${usernames[0]}, ${usernames[1]} and ${activityLength - 2}
    more started commented on your post.`;
  } else if (activityLength === 2) {
    CommentActivityText = `${usernames[0]} and ${usernames[1]} commented on your post.`;
  } else {
    CommentActivityText = `${usernames} commented on your post.`;
  }
  return (
    <>
      <img src={profilePic} alt="):" />
      <span>{CommentActivityText}</span>
    </>
  );
};

CommentActivity.propTypes = {
  ...activitiesPropTypes
};

export default CommentActivity;
