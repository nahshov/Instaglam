import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { isEmail } from 'validator';
import AuthHeader from 'components/AuthForm/AuthHeader/AuthHeader';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import Alert from 'components/Alert/Alert';
import AuthSwitch from 'components/AuthForm/AuthSwitch/AuthSwitch';
import {LOGIN_REQUESTED} from 'actions/auth/authTypes';
import styles from './LogInForm.module.scss';

const LogInForm = () => {
  const [logInForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [logInAlert, setLogInAlert] = useState('');
  const [showPass, setShowPass] = useState(false);

  const {
    isAuthenticated, loading
  } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const history = useHistory();

  const checkDisabled = () => Object.values(logInForm).some(
    value => !value || logInForm.password.length < 6
  );

  const handleChange = e => {
    setLoginForm({ ...logInForm, [e.target.name]: e.target.name === 'email' ? e.target.value.toLowerCase() : e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!isEmail(logInForm.email)) {
      setLogInAlert('Enter a valid email address.');
    } else if (logInForm.password.length < 6) {
      setLogInAlert('Enter a password at least 6 characters long.');
    } else {
      dispatch({type: LOGIN_REQUESTED, payload: {logInForm, setLogInAlert}})
    }
  };

  if (isAuthenticated && !loading) {
    return <Redirect to="/" />;
  }

  window.addEventListener('load', () => history.push('/accounts/welcomepage'));

  const inputType = showPass ? 'text' : 'password';
  const showPassBtn = showPass ? 'Hide' : 'Show';

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authDiv}>
        <AuthHeader />
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <InputField
            placeHolderText="Email"
            name="email"
            onChange={handleChange}
            classInput={
              logInForm.email ? styles.activeInput : styles.defaultInput
            }
            classSpan={
              logInForm.email ? styles.activeInputSpan : styles.defaultInputSpan
            }
          />
          <InputField
            placeHolderText="Password"
            type={inputType}
            name="password"
            onChange={handleChange}
            withButton
            onClick={() => {
              setShowPass(!showPass);
            }}
            btnText={showPassBtn}
            classInput={
              logInForm.password ? styles.activeInput : styles.defaultInput
            }
            classSpan={
              logInForm.password
                ? styles.activeInputSpan
                : styles.defaultInputSpan
            }
            logInForm
          />
          <Button
            type="submit"
            disabled={checkDisabled()}
            btnRole="primary btnBlock"
            isLoading={loading}
          >
            Log In
          </Button>
          {logInAlert && <Alert>{logInAlert}</Alert>}
        </form>
      </div>
      <AuthSwitch
        hasAccountText={"Don't have an account?"}
        linkText="Sign up"
        onClick={() => { return setLogInAlert(''); }}
      />
    </div>
  );
};

export default LogInForm;
