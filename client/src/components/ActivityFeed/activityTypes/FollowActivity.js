import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';
import { toggleFollows, getFollows } from 'actions/follows/followActions';
import { setNumOfFollowing } from 'actions/profile/profileActions';
import { followsSelector } from 'actions/follows/followSelectors';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import FollowButton from 'components/FollowButton/FollowButton';
import PropTypes from 'prop-types';
import styles from '../ActivityItem.module.scss';

const structuredFollowsSelector = createStructuredSelector({
  follows: followsSelector
});

const FollowActivity = ({
  activity,
  authenticatedUserId,
  usernames,
  profilePic,
  activityLength,
  created,
  activityUsernamesText }) => {
  const { follows } = useSelector(structuredFollowsSelector);
  const userOfActivityId = activity.activities[0].user._id;
  const [isFollowed, setIsFollowed] = useState(follows.some(follow => follow._id === userOfActivityId));

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(getFollows(authenticatedUserId, 'following'));
  }, [isFollowed]);

  const handleFollow = async () => {
    await dispatch(toggleFollows(userOfActivityId, isFollowed));
    setIsFollowed(!isFollowed);
    // if (activity.isFollowed) {
    //   dispatch(setNumOfFollowing(-1));
    // } else {
    //   dispatch(setNumOfFollowing(1));
    // }
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
  usernames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  profilePic: PropTypes.string.isRequired,
  activityLength: PropTypes.number.isRequired,
  activity: PropTypes.shape({
    isFollowed: PropTypes.bool.isRequired,
    activities: PropTypes.arrayOf(PropTypes.shape({
      user: PropTypes.shape({
        _id: PropTypes.string.isRequired
      }).isRequired
    })).isRequired
  }).isRequired,
  activityUsernamesText: PropTypes.string.isRequired,
  authenticatedUserId: PropTypes.string.isRequired
};

export default FollowActivity;
