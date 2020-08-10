import React from 'react';

const Follow = ({ profilePic, usernames, activityLength }) => {
  let followActivityText;
  if (activityLength > 2) {
    followActivityText = `and
    ${activityLength - 2}
    {' '}
    more started following you;`;
  } else if (activityLength = 2) {
    
  }
  return (
    <div>
      <img src={profilePic} alt="):" />
      <span>{usernames}</span>
      { activityLength > 2 ? (
        <span>
          and
          {activityLength - 2}
          {' '}
          more started following you
        </span>
      ) : (
        <span>
          {usernames}
          {' '}
          started following you
        </span>
      )}
    </div>
  );
};

export default Follow;
