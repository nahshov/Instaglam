import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import styles from './UserIdentifier.module.scss';

const UserIdentifier = ({ username, profilePic }) => {
  return (
    <div className={styles.userIdentifier}>
      <Link to={`/${username}`}>
        <ProfilePic url={profilePic} size="medium" />
      </Link>
      <Link className={styles.username} to={`/${username}`}>
        {username}
      </Link>
    </div>
  );
};

export default UserIdentifier;
