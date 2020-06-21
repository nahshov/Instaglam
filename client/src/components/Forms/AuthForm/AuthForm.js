import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUpForm from 'components/Forms/AuthForm/SignUpForm/SignUpForm';
import LogInForm from 'components/Forms/AuthForm/LogInForm/LogInForm';

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
          render={({history}) => (
            <SignUpForm
              history={history}
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              disabled={disabled}
              setDisabled={setDisabled}
              showPass={showPass}
              setShowPass={setShowPass}
            />
          )}
        />
        <Route
          exact
          path="/accounts/login/"
          render={({history}) => (
            <LogInForm
	            history={history}
	            hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              disabled={disabled}
              setDisabled={setDisabled}
              showPass={showPass}
              setShowPass={setShowPass}
            />
          )}
        />
      </Switch>
    </React.Fragment>
  );
};

export default AuthForm;
