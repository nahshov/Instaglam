import React from 'react';
import { useHistory } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { activityItemsPropTypes } from 'customPropTypes';
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
      <div className={styles.activityContentWrapper}>
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
            commented on your post.
          </span>
            &nbsp;
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
  ...activityItemsPropTypes
};

export default CommentActivity;
