import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/AuthForm/AuthHeader/AuthHeader.module.scss';

const AuthHeader = ({ hasAccount = false }) => {
  return (
    <div className={styles.authHeader}>
      <h1 className={styles.title}>Instaglam</h1>
      {hasAccount ? (
        <h2 className={styles.h2}>
          Sign up to see photos and videos from your friends.
        </h2>
      ) : null}
    </div>
  );
};

AuthHeader.defaultProps = {
  hasAccount: false
};

AuthHeader.propTypes = {
  hasAccount: PropTypes.bool
};
export default AuthHeader;
