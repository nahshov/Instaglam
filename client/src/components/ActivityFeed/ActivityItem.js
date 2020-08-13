import React from 'react';
import FollowActivity from 'components/ActivityFeed/activityTypes/FollowActivity';
import CommentActivity from 'components/ActivityFeed/activityTypes/CommentActivity';
import LikeActivity from 'components/ActivityFeed/activityTypes/LikeActivity';
import ReplyActivity from 'components/ActivityFeed/activityTypes/ReplyActivity';
import { activitiesPropTypes } from 'customPropTypes';

const ActivityItem = ({
  profilePic,
  usernames,
  activityLength,
  activityType,
  referredEntityType,
  referredEntity }) => (
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
        referredEntity={referredEntity}
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

ActivityItem.propTypes = {
  ...activitiesPropTypes
};

export default ActivityItem;
