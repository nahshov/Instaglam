import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import styles from './PostContent.module.scss';

const PostContent = ({ profilePic, username, content }) => {
  return (
    <div style={{ width: '100%' }}>
      <div className={styles.postContent}>
        <div className={styles.postContentContainer}>
          <ProfilePic url={profilePic} size="medium" />
          <Link to={`/${username}`}>
            <span className={styles.username}>
              {username}
            </span>
          </Link>
          <div className={styles.contentWrapper}>
            <span className={styles.readMoreContent}>
              {content}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
