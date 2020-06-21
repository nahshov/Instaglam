import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUpForm from 'components/AuthForm/SignUpForm/SignUpForm';
import LogInForm from 'components/AuthForm/LogInForm/LogInForm';

const AuthForm = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [showPass, setShowPass] = useState(false);

  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path="/accounts/emailsignup/"
          render={({ history }) => (
            <SignUpForm
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              disabled={disabled}
              setDisabled={setDisabled}
              showPass={showPass}
              setShowPass={setShowPass}
              history={history}
            />
          )}
        />
        <Route
          exact
          path="/accounts/login/"
          render={({ history }) => (
            <LogInForm
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              disabled={disabled}
              setDisabled={setDisabled}
              showPass={showPass}
              setShowPass={setShowPass}
              history={history}
            />
          )}
        />
      </Switch>
    </React.Fragment>
  );
};

export default AuthForm;
