import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/AuthForm/AuthHeader/AuthHeader.module.scss';

const AuthHeader = ({ hasAccount = false, style = {} }) => (
  <div className={styles.authHeader} style={style}>
    <h1 className={styles.title}>Instaglam</h1>
    {hasAccount ? (
      <h2 className={styles.h2}>
        Sign up to see photos and videos from your friends.
      </h2>
    ) : null}
  </div>
);

AuthHeader.defaultProps = {
  hasAccount: false,
  style: {}
};

AuthHeader.propTypes = {
  hasAccount: PropTypes.bool,
  style: PropTypes.shape({})
};
export default AuthHeader;
