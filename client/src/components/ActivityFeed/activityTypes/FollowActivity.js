import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory, useLocation } from 'react-router-dom';
import { toggleFollows, getFollows } from 'actions/follows/followActions';
import { setNumOfFollowing, setNumOfFollowers } from 'actions/profile/profileActions';
import { followsSelector } from 'actions/follows/followSelectors';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import FollowButton from 'components/FollowButton/FollowButton';
import { activityItemsPropTypes } from 'customPropTypes';
import styles from '../ActivityItem.module.scss';

const structuredFollowActivitySelector = createStructuredSelector({
  follows: followsSelector,
  authenticatedUser: authenticatedUserSelector
});

const FollowActivity = ({
  activity,
  usernames,
  profilePic,
  activityLength,
  created,
  activityUsernamesText
}) => {
  const { follows, authenticatedUser } = useSelector(structuredFollowActivitySelector);
  const userOfActivityId = activity.activities[0].user._id;
  const [isFollowed, setIsFollowed] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  const { pathname } = useLocation();

  useEffect(() => {
    setIsFollowed(follows.some(follow => (follow._id === userOfActivityId)));
  }, [follows, userOfActivityId]);

  const handleFollow = async () => {
    const isProfilePage = usernames[0] === pathname.replace('/', '');

    const isAuthenticatedUserProfile = authenticatedUser.username === pathname.replace('/', '');

    if (isProfilePage) {
      await dispatch(toggleFollows(userOfActivityId, isFollowed));

      if (isFollowed) {
        dispatch(setNumOfFollowers(-1));
      } else {
        dispatch(setNumOfFollowers(1));
      }
    } else if (isAuthenticatedUserProfile) {
      await dispatch(toggleFollows(userOfActivityId, isFollowed));

      if (isFollowed) {
        dispatch(setNumOfFollowing(-1));
      } else {
        dispatch(setNumOfFollowing(1));
      }
    } else {
      await dispatch(toggleFollows(userOfActivityId, isFollowed));
    }

    await dispatch(getFollows(authenticatedUser._id, 'following'));
  };

  return (
    <div className={styles.activityWrapper}>
      <div onClick={() => history.push(`/${usernames[0]}`)} className={styles.activityContentWrapper}>
        <div className={styles.activityProfilePicDiv}>
          <ProfilePic
            url={profilePic}
            size="medium"
            className={styles.activityProfilePicDiv}
          />
        </div>
        <div className={styles.activityContent}>
          <span className={styles.activityUsernamesText}>{activityUsernamesText}</span>
            &nbsp;
          <span>
            started following you.
          </span>
            &nbsp;
          {created}
        </div>
      </div>
      <div className={styles.activityMedia}>
        {activityLength < 2
            && (
            <FollowButton
              handleFollow={handleFollow}
              isFollowed={isFollowed}
            />
            )}
      </div>
    </div>
  );
};

FollowActivity.propTypes = {
  ...activityItemsPropTypes
};

export default FollowActivity;
