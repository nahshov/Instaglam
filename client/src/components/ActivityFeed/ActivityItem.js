import React from 'react';
import FollowActivity from 'components/ActivityFeed/activityTypes/FollowActivity';
import PropTypes from 'prop-types';

const ActivityItem = ({ profilePic, usernames, activityLength, activityType }) => (
  <div>
    {activityType === 'follow' && (
    <FollowActivity
      profilePic={profilePic}
      usernames={usernames}
      activityLength={activityLength}
    />
    )}
  </div>
);

// Activity.propTypes = {
//   profilePic: PropTypes.
// }

export default ActivityItem;
