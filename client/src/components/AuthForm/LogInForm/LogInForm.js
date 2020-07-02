import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import AuthHeader from 'components/AuthForm/AuthHeader/AuthHeader';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import Alert from 'components/Alert/Alert';
import AuthSwitch from 'components/AuthForm/AuthSwitch/AuthSwitch';
import { login } from 'actions/auth';
import { setAlert } from 'actions/alert';
import styles from './LogInForm.module.scss';

const LogInForm = () => {
  const [logInForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [hasAccount] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    auth: { isAuthenticated, loading },
    alert
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const checkDisabled = () => {
    const result = Object.values(logInForm).filter((value) => value !== '');
    return result.length < 2 || logInForm.password.length < 6;
  };

  const handleChange = (e) => {
    setLoginForm({ ...logInForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(logInForm.email)) {
      dispatch(setAlert('Enter a valid email address.', 'Error'));
    } else if (logInForm.password.length < 6 || logInForm.password === '') {
      dispatch(setAlert('Enter a password at least 6 characters long.'));
    } else {
      setIsLoading(true);
      dispatch(login(logInForm));
      dispatch(setAlert('', null));
    }
  };

  if (isAuthenticated && !loading) {
    return <Redirect to="/" />;
  }

  const inputType = showPass ? 'text' : 'password';
  const buttonText = showPass ? 'Hide' : 'Show';

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authDiv}>
        <AuthHeader hasAccount={hasAccount} />
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <InputField
            text="Email"
            name="email"
            onChange={handleChange}
            classInput={
              logInForm.email !== '' ? styles.activeInput : styles.defaultInput
            }
            classSpan={
              logInForm.email !== ''
                ? styles.activeInputSpan
                : styles.defaultInputSpan
            }
          />
          <InputField
            text="Password"
            type={inputType}
            name="password"
            onChange={handleChange}
            withButton
            onClick={() => {
              setShowPass(!showPass);
            }}
            content={buttonText}
            classInput={
              logInForm.password !== ''
                ? styles.activeInput
                : styles.defaultInput
            }
            classSpan={
              logInForm.password !== ''
                ? styles.activeInputSpan
                : styles.defaultInputSpan
            }
            logInForm
          />
          <Button
            text="Log In"
            disabled={checkDisabled()}
            btnRole="primary btnBlock"
            isLoading={!loading ? false : isLoading}
          />
          {alert.message === '' ? null : <Alert alerts={alert.message} />}
        </form>
      </div>
      <AuthSwitch
        hasAccountText={"Don't have an account?"}
        linkText="Sign up"
      />
    </div>
  );
};

export default LogInForm;
