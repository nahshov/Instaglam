import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from 'components/AuthForm/AuthSwitch/AuthSwitch.module.scss';

const AuthSwitch = ({ hasAccountText, linkText }) => (
  <div className={styles.wrapper}>
    <p className={styles.paragraph}>
      <span>{hasAccountText}</span>
      {linkText === 'Sign up' ? (
        <Link className={styles.link} to="/accounts/emailsignup/">
          {linkText}
        </Link>
      ) : (
        <Link className={styles.link} to="/accounts/login/">
          {linkText}
        </Link>
      )}
    </p>
  </div>
);

AuthSwitch.propTypes = {
  hasAccountText: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired
};

export default AuthSwitch;
