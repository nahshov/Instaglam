import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'components/Forms/AuthForm/AuthSwitch/AuthSwitch.module.scss';

const AuthSwitch = ({
  hasAccount,
  setHasAccount,
  hasAccountText,
  linkText
}) => (
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

export default AuthSwitch;
