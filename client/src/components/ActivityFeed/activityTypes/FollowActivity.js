import React from 'react';
import { useHistory } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import PropTypes from 'prop-types';
import { activitiesPropTypes } from 'customPropTypes';

const FollowActivity = ({ profilePic, usernames, activityLength }) => {
  let followActivityText;

  const history = useHistory();

  if (activityLength > 2) {
    followActivityText = `${usernames[0]}, ${usernames[1]} and ${activityLength - 2}
    more started following you.`;
  } else if (activityLength === 2) {
    followActivityText = `${usernames[0]} and ${usernames[1]} started following you.`;
  } else {
    followActivityText = `${usernames} started following you.`;
  }
  return (
    <div onClick={() => history.push(`/${usernames[0]}`)}>
      <ProfilePic
        url={profilePic}
        size="medium"
      />
      <span>{followActivityText}</span>
    </div>
  );
};

FollowActivity.propTypes = {
  ...activitiesPropTypes
};

export default FollowActivity;
