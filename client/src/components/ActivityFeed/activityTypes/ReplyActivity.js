import React from 'react';
import { useHistory } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import PropTypes from 'prop-types';
import { activitiesPropTypes } from 'customPropTypes';
import styles from '../ActivityItem.module.scss';

const ReplyActivity = ({
  activity,
  profilePic,
  created,
  activityUsernamesText }) => {
  const { referredEntity } = activity;

  const history = useHistory();

  return (
    <div onClick={() => history.push(`/p/${referredEntity.post._id}`)} className={styles.activityWrapper}>
      <div className={styles.activityProfilePicDiv}>
        <ProfilePic
          url={profilePic}
          size="medium"
        />
      </div>
      <div className={styles.activityContentWrapper}>
        <div className={styles.activityUsernamesText}>
          <span>{activityUsernamesText}</span>
        </div>
        <div className={styles.activityCreatedDiv}>
          <span> &nbsp;replied to your comment.</span>
          {created}
        </div>
      </div>
      <div className={styles.activityMedia}>
        <img src={referredEntity.post.media} alt="postPicture" />
      </div>
    </div>
  );
};

ReplyActivity.propTypes = {
  profilePic: PropTypes.string.isRequired,
  activity: PropTypes.shape({
    referredEntity: PropTypes.shape({
      post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        media: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

export default ReplyActivity;
