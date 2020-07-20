import React from 'react';
import AuthHeader from 'components/AuthForm/AuthHeader/AuthHeader';
import AuthSwitch from 'components/AuthForm/AuthSwitch/AuthSwitch';
import styles from './WelcomePage.module.scss';

const WelcomePage = () => (
  <div className={styles.welcomePageWrapper}>
    <div className={styles.welcomePageDiv}>
      <div className={styles.welcomeBox}>
        <p>Welcome to</p>
        <AuthHeader />
      </div>
      <div className={styles.welcomeAuthSwitchDiv}>
        <AuthSwitch
          hasAccountText="Have an account?"
          linkText="Log in"
        />
        <AuthSwitch
          hasAccountText="Don't have an account?"
          linkText="Sign up"
        />
      </div>
    </div>
  </div>
);

export default WelcomePage;
