import React from 'react';
import { activityTypesObject } from 'utils/activityTypesObject';
import { activitiesPropTypes } from 'customPropTypes';
import PropTypes from 'prop-types';

const getActivitiesUsers = (activities = []) => {
  return activities.length >= 2
    ? [activities[activities.length - 1].user.username,
      activities[activities.length - 2].user.username]
    : [activities[0].user.username];
};

const ActivityItem = ({
  activity
}) => {
  const { profilePic } = activity.activities[activity.activities.length - 1].user;
  const usernames = getActivitiesUsers(activity.activities);
  const ActivityComponent = activityTypesObject[activity.activityType];
  const activityLength = activity.activities.length;

  return (
    <>
      <ActivityComponent
        activity={activity}
        usernames={usernames}
        profilePic={profilePic}
        activityLength={activityLength}
      />
    </>
  );
};

ActivityItem.propTypes = {
  activity: PropTypes.shape({
    activities: PropTypes.array.isRequired,
    activityType: PropTypes.string.isRequired
  }).isRequired
};

export default ActivityItem;
