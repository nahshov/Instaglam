import React from 'react';
import styles from './AuthSwitch.module.scss';
import { Link } from 'react-router-dom';

const AuthSwitch = ({
  hasAccount,
  setHasAccount,
  hasAccountText,
  linkText,
}) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.paragraph}>
        <span>{hasAccountText}</span>
        {!hasAccount ? (
          <Link
            className={styles.link}
            to="/accounts/emailsignup/"
            onClick={() => setHasAccount(!hasAccount)}
          >
            {linkText}
          </Link>
        ) : (
          <Link
            className={styles.link}
            to="/accounts/login/"
            onClick={() => setHasAccount(!hasAccount)}
          >
            {linkText}
          </Link>
        )}
      </p>
    </div>
  );
};

export default AuthSwitch;
