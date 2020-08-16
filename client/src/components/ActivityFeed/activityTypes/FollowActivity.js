import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { followingSelector } from 'actions/follows/followSelectors';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import { getFollowing, toggleFollows } from 'actions/follows/followActions';
import { setNumOfFollowing } from 'actions/profile/profileActions';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import FollowButton from 'components/FollowButton/FollowButton';
import PropTypes from 'prop-types';
import { activitiesPropTypes } from 'customPropTypes';

const structuredFollowingSelector = createStructuredSelector({
  follows: followingSelector
});

const FollowActivity = ({ profilePic, usernames, activityLength, user }) => {
  const { follows } = useSelector(structuredFollowingSelector);

  let followActivityText;

  const dispatch = useDispatch();

  const history = useHistory();

  // follows.forEach(follow => console.log(follow));

  const handleFollow = async (user) => {
    console.log(user);
    console.log(usernames);
    if (usernames[0] === user.username) {
      await dispatch(toggleFollows(user._id, user.isFollowed));
      console.log(user.isFollowed);
      if (user.isFollowed) {
        dispatch(setNumOfFollowing(-1));
      } else {
        dispatch(setNumOfFollowing(1));
      }
    }
  };

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
      <FollowButton />
    </div>
  );
};

export default FollowActivity;
