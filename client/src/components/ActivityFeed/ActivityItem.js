import React from 'react';

const ActivityItem = ({ profilePic, usernames, activityLength }) => (
  <div>
    <div>
      <img src={profilePic} alt="):" />
      <span>{usernames}</span>
      <span>
        and
        {activityLength}
        {' '}
        more
      </span>
    </div>
  </div>
);

export default ActivityItem;
