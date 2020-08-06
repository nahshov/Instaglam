import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from 'components/AuthForm/AuthSwitch/AuthSwitch.module.scss';

const AuthSwitch = ({ hasAccountText, linkText, ...otherProps }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.paragraph}>
        <span>{hasAccountText}</span>
        {linkText === 'Sign up' ? (
          <Link
            className={styles.link}
            to="/accounts/emailsignup/"
            {...otherProps}
          >
            {linkText}
          </Link>
        ) : (
          <Link
            className={styles.link}
            to="/accounts/login/"
            {...otherProps}
          >
            {linkText}
          </Link>
        )}
      </p>
    </div>
  );
};

AuthSwitch.propTypes = {
  hasAccountText: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired
};

export default AuthSwitch;
