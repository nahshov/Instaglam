import React from 'react';
import { activityTypesObject } from 'utils/activityTypesObject';
import CreatedTime from 'components/CreatedTime/CreatedTime';
// import { activitiesPropTypes } from 'customPropTypes';
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
  const ActivityComponent = activityTypesObject[activity.activityType];
  const { profilePic } = activity.activities[activity.activities.length - 1].user;
  const usernames = getActivitiesUsers(activity.activities);
  const activityLength = activity.activities.length;
  const { created } = activity;

  return (
    <>
      <ActivityComponent
        activity={activity}
        usernames={usernames}
        profilePic={profilePic}
        activityLength={activityLength}
        created={<CreatedTime created={created} />}
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
