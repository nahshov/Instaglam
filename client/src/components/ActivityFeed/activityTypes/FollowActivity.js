import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toggleFollows } from 'actions/follows/followActions';
import { setNumOfFollowing } from 'actions/profile/profileActions';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import FollowButton from 'components/FollowButton/FollowButton';
import PropTypes from 'prop-types';
import styles from '../ActivityItem.module.scss';

const FollowActivity = ({
  activity,
  usernames,
  profilePic,
  activityLength,
  created,
  activityUsernamesText }) => {
  const userOfActivityId = activity.activities[0].user._id;

  const dispatch = useDispatch();

  const history = useHistory();

  const handleFollow = async () => {
    await dispatch(toggleFollows(userOfActivityId, activity.isFollowed));
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
          <span>{activityUsernamesText}</span>
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
              isFollowed={activity.isFollowed}
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
  activityUsernamesText: PropTypes.string.isRequired
};

export default FollowActivity;
