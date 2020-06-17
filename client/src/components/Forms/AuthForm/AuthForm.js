import React, { useState, useEffect } from 'react';
import SignUpForm from './SignUpForm/SignUpForm';
import LogInForm from './LogInForm/LogInForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const AuthForm = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const [form, setForm] = useState({
    phoneOrEmail: '',
    fullName: '',
    userName: '',
    password: ''
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const result = Object.values(form).filter((value) => {
      return value !== '';
    });
    result.length < 4 || form.password.length < 6
      ? setDisabled(true)
      : setDisabled(false);
  }, [form, disabled]);

  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path="/accounts/emailsignup/"
          render={() => (
            <SignUpForm
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              disabled={disabled}
              setDisabled={setDisabled}
              form={form}
              setForm={setForm}
            />
          )}
        />
        <Route
          exact
          path="/accounts/login/"
          render={() => (
            <LogInForm
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              disabled={disabled}
              setDisabled={setDisabled}
              form={form}
              setForm={setForm}
            />
          )}
        />
      </Switch>
    </React.Fragment>
  );
};

export default AuthForm;
