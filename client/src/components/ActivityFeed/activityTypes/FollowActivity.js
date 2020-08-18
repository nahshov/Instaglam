import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { followsSelector } from 'actions/follows/followSelectors';
import { activitiesFeedFollowsSelector } from 'actions/activities/activitiesFeedSelectors';
import { toggleActivitiesFeedFollows } from 'actions/activities/activitiesFeedActions';
import { toggleFollows, getFollows } from 'actions/follows/followActions';
import { setNumOfFollowing } from 'actions/profile/profileActions';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import FollowButton from 'components/FollowButton/FollowButton';
import PropTypes from 'prop-types';

const structuredActivitesFeedFollowingSelector = createStructuredSelector({
  activitiesFeedFollows: activitiesFeedFollowsSelector,
  authenticatedUser: authenticatedUserSelector
});

const FollowActivity = ({ activity, usernames, profilePic, activityLength }) => {
  const { activitiesFeedFollows, authenticatedUser } = useSelector(structuredActivitesFeedFollowingSelector);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    console.log(activitiesFeedFollows);
  }, [activitiesFeedFollows]);

  console.log(activitiesFeedFollows);
  const userOfActivity = activity.activities[0].user;
  // const isUserFollowed = follows.find(follow => follow._id === activityUserId);

  const handleFollow = (user) => {
    dispatch(toggleActivitiesFeedFollows(user._id, user.isFollowed));
    if (user.isFollowed) {
      dispatch(setNumOfFollowing(-1));
    } else {
      dispatch(setNumOfFollowing(1));
    }
  };

  let followActivityText;

  if (activityLength > 2) {
    followActivityText = `${usernames[0]}, ${usernames[1]} and ${activityLength - 2}
    more started following you.`;
  } else if (activityLength === 2) {
    followActivityText = `${usernames[0]} and ${usernames[1]} started following you.`;
  } else {
    followActivityText = `${usernames} started following you.`;
  }

  return (
    <div>
      <div onClick={() => history.push(`/${usernames[0]}`)}>
        <ProfilePic
          url={profilePic}
          size="medium"
        />
        <span>{followActivityText}</span>
      </div>

      {activityLength < 2
            && (
            <FollowButton
              handleFollow={() => handleFollow(userOfActivity)}
              isFollowed={userOfActivity.isFollowed}
            />
            )}
    </div>
  );
};

FollowActivity.propTypes = {
  usernames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  profilePic: PropTypes.string.isRequired,
  activityLength: PropTypes.number.isRequired,
  activity: PropTypes.shape({
    activities: PropTypes.arrayOf(PropTypes.shape({
      user: PropTypes.shape({
        _id: PropTypes.string.isRequired
      }).isRequired
    })).isRequired
  }).isRequired
};

export default FollowActivity;
