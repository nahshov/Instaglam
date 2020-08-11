import React from 'react';
import FollowActivity from 'components/ActivityFeed/activityTypes/FollowActivity';
import CommentActivity from 'components/ActivityFeed/activityTypes/CommentActivity';
import LikeActivity from 'components/ActivityFeed/activityTypes/LikeActivity';
import ReplyActivity from 'components/ActivityFeed/activityTypes/ReplyActivity';
import PropTypes from 'prop-types';

const ActivityItem = ({ profilePic, usernames, activityLength, activityType, referredEntityType }) => (
  <>
    {activityType === 'follow' && (
    <FollowActivity
      profilePic={profilePic}
      usernames={usernames}
      activityLength={activityLength}
    />
    )}
    {activityType === 'comment' && (
      <CommentActivity
        profilePic={profilePic}
        usernames={usernames}
        activityLength={activityLength}
      />
    )}
    {activityType === 'like' && (
      <LikeActivity
        profilePic={profilePic}
        usernames={usernames}
        activityLength={activityLength}
        referredEntityType={referredEntityType}
      />
    )}
    {activityType === 'reply' && (
      <ReplyActivity
        profilePic={profilePic}
        usernames={usernames}
        activityLength={activityLength}
      />
    )}
  </>
);

// Activity.propTypes = {
//   profilePic: PropTypes.
// }

export default ActivityItem;
