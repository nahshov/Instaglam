import React from 'react';
import { useHistory } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { activityItemsPropTypes } from 'customPropTypes';
import styles from '../ActivityItem.module.scss';

const LikeActivity = ({
  activity,
  profilePic,
  created,
  activityUsernamesText
}) => {
  const { referredEntity, referredEntityType } = activity;

  const history = useHistory();

  let likeActivityText;
  let postId;
  let postMedia;

  if (referredEntityType === 'Post') {
    postId = referredEntity._id;
    postMedia = referredEntity.media;
    likeActivityText = 'liked your post.';
  } else {
    postId = referredEntity.post;
    postMedia = referredEntity.post.media;
    likeActivityText = 'liked your comment.';
  }

  return (
    <div onClick={() => history.push(`/p/${postId}`)} className={styles.activityWrapper}>
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
            {likeActivityText}
          </span>
            &nbsp;
          {created}
        </div>
      </div>
      <div className={styles.activityMedia}>
        <img src={postMedia} alt="postPic" />
      </div>
    </div>
  );
};

LikeActivity.propTypes = {
  ...activityItemsPropTypes
};

export default LikeActivity;
