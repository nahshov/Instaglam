import React from 'react';
import { useSelector } from 'react-redux';
import styles from './PostConversation.module.scss';
import ProfilePic from '../../ProfilePic/ProfilePic';

const PostConversation = ({ /* isHorizontal */ }) => {
  const { users: { user: { username, profilePic } } } = useSelector(state => state);

  return (
    <div className={styles.conversation}>
      <header className={styles.postHeader}>
        <div className={styles.postUserInfo}>
          <ProfilePic big url={profilePic} style={{ display: 'inline-block' }} />
          <span>{username}</span>
        </div>
      </header>
    </div>
  );
};

export default PostConversation;
