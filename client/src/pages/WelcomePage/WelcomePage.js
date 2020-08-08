import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AuthHeader from 'components/AuthForm/AuthHeader/AuthHeader';
import AuthSwitch from 'components/AuthForm/AuthSwitch/AuthSwitch';
import styles from './WelcomePage.module.scss';

const WelcomePage = () => {
  const {
    auth: { isAuthenticated, loading }
  } = useSelector(state => { return state; });

  if (isAuthenticated && !loading) {
    return <Redirect to="/" />;
  }

  return (
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
            hasAccountText={"Don't have an account?"}
            linkText="Sign up"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
