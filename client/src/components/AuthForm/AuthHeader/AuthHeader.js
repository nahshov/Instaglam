import React from 'react';
import styles from 'components/AuthForm/AuthHeader/AuthHeader.module.scss';

const AuthHeader = ({ hasAccount }) => (
  <div className={styles.authHeader}>
    <h1 className={styles.title}>Instaglam</h1>
    {hasAccount ? (
      <h2 className={styles.h2}>
        Sign up to see photos and videos from your friends.
      </h2>
    ) : null}
  </div>
);
export default AuthHeader;
