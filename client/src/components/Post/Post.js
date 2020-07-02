import React from 'react';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import styles from './Post.module.scss';

const Post = () => (
  <article className={styles.postContainer}>
    <div className={styles.postHeader}>
      <div className={styles.userIdentifier}>
        <ProfilePic />
      </div>
    </div>
  </article>
);

export default Post;
