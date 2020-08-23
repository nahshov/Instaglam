import React from 'react';
import { useHistory } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import PropTypes from 'prop-types';
import { activitiesPropTypes } from 'customPropTypes';
import styles from '../ActivityItem.module.scss';

const LikeActivity = ({
  activity,
  profilePic,
  created,
  activityUsernamesText
}) => {
  const { referredEntity } = activity;
  const { referredEntityType } = activity;

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
          <div className={styles.activityUsernamesText}>
            <span>{activityUsernamesText}</span>
          </div>
          <div className={styles.activityCreatedDiv}>
            <span>
              {likeActivityText}
            </span>
            {created}
          </div>
        </div>
      </div>
      <div className={styles.activityMedia}>
        <img src={postMedia} alt="postPic" />
      </div>
    </div>
  );
};

LikeActivity.defaultProps = {
  activity: PropTypes.shape({
    referredEntity: PropTypes.shape({
      post: ''
    })
  })
};

LikeActivity.propTypes = {
  profilePic: PropTypes.string.isRequired,
  activity: PropTypes.shape({
    referredEntityType: PropTypes.string.isRequired,
    referredEntity: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      media: PropTypes.string.isRequired,
      post: PropTypes.shape({
        media: PropTypes.string.isRequired
      })
    })
  })
};

export default LikeActivity;
