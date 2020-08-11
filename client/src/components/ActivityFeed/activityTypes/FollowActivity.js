import React from 'react';

const FollowActivity = ({ profilePic, usernames, activityLength }) => {
  let followActivityText;

  if (activityLength > 2) {
    followActivityText = `${usernames[0]}, ${usernames[1]} and ${activityLength - 2}
    more started following you.`;
  } else if (activityLength === 2) {
    followActivityText = `${usernames[0]} and ${usernames[1]} started following you.`;
  } else {
    followActivityText = `${usernames} started following you.`;
  }
  return (
    <>
      <img src={profilePic} alt="):" />
      <span>{followActivityText}</span>
    </>
  );
};

export default FollowActivity;
