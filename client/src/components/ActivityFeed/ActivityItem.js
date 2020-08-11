import React from 'react';
import PropTypes from 'prop-types';

const ActivityItem = ({ profilePic, usernames, activityLength }) => (
  <div>
    <div>
      <img src={profilePic} alt="):" />
      <span>{usernames}</span>
      <span>
        and
        {activityLength - 2}
        {' '}
        more
      </span>
    </div>
  </div>
);

// Activity.propTypes = {
//   profilePic: PropTypes.
// }

export default ActivityItem;
