import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { followsSelector } from 'actions/follows/followSelectors';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import { toggleFollows, getFollows } from 'actions/follows/followActions';

import { setNumOfFollowing } from 'actions/profile/profileActions';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import FollowButton from 'components/FollowButton/FollowButton';
import PropTypes from 'prop-types';

const structuredFollowingSelector = createStructuredSelector({
  follows: followsSelector
});

const FollowActivity = ({ activity, usernames, profilePic, activityLength }) => {
  const { follows } = useSelector(structuredFollowingSelector);
  const userId = activity.activities[0].user._id;
  const isUserFollowed = follows.find(follow => follow._id === userId);
  console.log(isUserFollowed);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollows(activity.referredEntity._id, 'following'));
  }, []);

  const history = useHistory();

  const handleFollow = async (user, isUserFollowed) => {
    console.log(user, usernames[0]);
    await dispatch(toggleFollows(user, isUserFollowed));
    console.log('hi');
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
          handleFollow={() => handleFollow(userId, isUserFollowed)}
          isFollowed={isUserFollowed && isUserFollowed.isFollowed}
        />
        )}
    </div>
  );
};

FollowActivity.propTypes = {
  usernames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  profilePic: PropTypes.string.isRequired,
  activityLength: PropTypes.number.isRequired
};

export default FollowActivity;
