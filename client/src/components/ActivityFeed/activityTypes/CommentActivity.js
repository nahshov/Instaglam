import React from 'react';
import { useHistory } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import PropTypes from 'prop-types';
import { activitiesPropTypes } from 'customPropTypes';
import styles from '../ActivityItem.module.scss';

const CommentActivity = ({
  activity,
  profilePic,
  created,
  activityUsernamesText }) => {
  const { referredEntity } = activity;

  const history = useHistory();

  return (
    <div onClick={() => history.push(`/p/${referredEntity._id}`)} className={styles.activityWrapper}>
      <div className={styles.activityProfilePicDiv}>
        <ProfilePic
          url={profilePic}
          size="medium"
        />
      </div>
      <div className={styles.activityContentWrapper}>
        <span>{activityUsernamesText}</span>
        <div className={styles.activityCreatedDiv}>
          <span> &nbsp;commented on your post.</span>
          {created}
        </div>
      </div>
      <div className={styles.activityMedia}>
        <img src={referredEntity.media} alt="postPicture" />
      </div>
    </div>
  );
};

CommentActivity.propTypes = {
  profilePic: PropTypes.string.isRequired,
  activity: PropTypes.shape({
    referredEntity: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      media: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default CommentActivity;
