import React from 'react';
import { activitiesPropTypes } from 'customPropTypes';

const ReplyActivity = ({ profilePic, usernames, activityLength }) => {
  let ReplyActivityText;

  if (activityLength > 2) {
    ReplyActivityText = `${usernames[0]}, ${usernames[1]} and ${activityLength - 2}
    more replied to your comment.`;
  } else if (activityLength === 2) {
    ReplyActivityText = `${usernames[0]} and ${usernames[1]} replied to your comment.`;
  } else {
    ReplyActivityText = `${usernames} replied to your comment.`;
  }
  return (
    <>
      <img src={profilePic} alt="):" />
      <span>{ReplyActivityText}</span>
    </>
  );
};

ReplyActivity.propTypes = {
  ...activitiesPropTypes
};

export default ReplyActivity;
