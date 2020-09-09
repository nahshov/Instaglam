import React from 'react';
import { activityTypesObject } from 'utils/activityTypesObject';
import CreatedTime from 'components/CreatedTime/CreatedTime';
import { activityPropTypes } from 'customPropTypes';

const getActivitiesUsers = (activities = []) => {
  return activities.length >= 2
    ? [activities[activities.length - 1].user.username,
      activities[activities.length - 2].user.username]
    : [activities[0].user.username];
};

const getActivityUsernamesText = (lengthOfActivity, usernamesArr) => {
  if (lengthOfActivity > 2) {
    return `${usernamesArr[0]}, ${usernamesArr[1]} and ${lengthOfActivity - 2}
    more`;
  } if (lengthOfActivity === 2) {
    return `${usernamesArr[0]} and ${usernamesArr[1]}`;
  }
  return `${usernamesArr}`;
};

const ActivityItem = ({
  activity
}) => {
  const ActivityComponent = activityTypesObject[activity.activityType];
  const { profilePic } = activity.activities[activity.activities.length - 1].user;
  const usernames = getActivitiesUsers(activity.activities);
  const activityLength = activity.activities.length;
  const { created } = activity;
  const activityUsernamesText = getActivityUsernamesText(activityLength, usernames);

  return (
    <>
      <ActivityComponent
        activity={activity}
        usernames={usernames}
        profilePic={profilePic}
        activityLength={activityLength}
        activityUsernamesText={activityUsernamesText}
        created={<CreatedTime created={created} />}
      />
    </>
  );
};

ActivityItem.propTypes = {
  ...activityPropTypes
};

export default ActivityItem;
