import React from 'react';
import styles from './AuthSwitch.module.scss';

const AuthSwitch = ({ hasAccount, setHasAccount }) => {
	const hasAccountText = !hasAccount
		? "Don't have an account?"
		: 'Have an account?';
	const linkText = !hasAccount ? 'Sign up' : 'Log in';

	return (
  <div className={styles.wrapper}>
    <p className={styles.paragraph}>
      {hasAccountText}
      <a href='#' className={styles.link}>
        <span
          className={styles.linkText}
          onClick={() => setHasAccount(!hasAccount)}
        >
          {linkText}
        </span>
      </a>
    </p>
  </div>
	);
};

export default AuthSwitch;
