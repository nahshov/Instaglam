import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { isEmail } from 'validator';
import AuthHeader from 'components/AuthForm/AuthHeader/AuthHeader';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import Alert from 'components/Alert/Alert';
import AuthSwitch from 'components/AuthForm/AuthSwitch/AuthSwitch';
import ErrorIcon from 'components/Icons/ErrorIcon/ErrorIcon';
import CheckIcon from 'components/Icons/CheckIcon/CheckIcon';
import { register } from 'actions/auth/authActions';
import styles from './SignUpForm.module.scss';

const SignUpForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    fullName: '',
    username: '',
    password: ''
  });
  const [signUpAlert, setSignUpAlert] = useState('');
  const [emailCheckOrError, setEmailCheckOrError] = useState('');
  const [fullNameCheckOrError, setFullNameCheckOrError] = useState('');
  const [usernameCheckOrError, setUsernameCheckOrError] = useState('');
  const [passwordCheckOrError, setPasswordCheckOrError] = useState('');

  const {
    isAuthenticated, loading
  } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!signUpForm.email) {
      setEmailCheckOrError('');
    } else if (!isEmail(signUpForm.email)) {
      setEmailCheckOrError('Error');
    } else {
      setEmailCheckOrError('Check');
    }

    if (signUpForm.fullName) {
      setFullNameCheckOrError('Check');
    } else {
      setFullNameCheckOrError('');
    }

    if (signUpForm.username.length && usernameCheckOrError !== 'Error') {
      setUsernameCheckOrError('Check');
    } else {
      setUsernameCheckOrError('');
    }

    if (signUpForm.password.length >= 6) {
      setPasswordCheckOrError('Check');
    } else {
      setPasswordCheckOrError('');
    }
  }, [signUpForm, usernameCheckOrError]);

  const checkDisabled = () => Object.values(signUpForm).some(
    value => !value || signUpForm.password.length < 6
  );

  const handleChange = e => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.name === 'email' ? e.target.value.toLowerCase() : e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!isEmail(signUpForm.email)) {
      setSignUpAlert('Enter a valid email address.');
    } else if (signUpForm.password.length < 6) {
      setSignUpAlert('Create a password at least 6 characters long.');
    } else if (!signUpForm.fullName || !signUpForm.username) {
      setSignUpAlert('Full Name/Username are required fields');
    } else {
      dispatch(register(signUpForm, setSignUpAlert));
      setSignUpAlert('');
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  window.addEventListener('load', () => history.push('/accounts/welcomepage'));

  const inputType = showPass ? 'text' : 'password';
  const buttonText = showPass ? 'Hide' : 'Show';
  const emailValidationIcon = signUpAlert !== `Another account is using ${signUpForm.email}`
    && emailCheckOrError === 'Check' ? (
      <CheckIcon />
    ) : (
      <ErrorIcon />
    );

  const usernameValidationIcon = signUpAlert !== "This username isn't available. Please try another."
    && usernameCheckOrError === 'Check' ? (
      <CheckIcon />
    ) : (
      <ErrorIcon />
    );

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authDiv}>
        <AuthHeader hasAccount />
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <InputField
            placeHolderText="Email"
            name="email"
            onChange={handleChange}
            withButton={false}
            inputFieldIcon={emailCheckOrError && emailValidationIcon}
            classInput={
              signUpForm.email ? styles.activeInput : styles.defaultInput
            }
            classSpan={
              signUpForm.email
                ? styles.activeInputSpan
                : styles.defaultInputSpan
            }
          />
          <InputField
            placeHolderText="Full Name"
            name="fullName"
            onChange={handleChange}
            withButton={false}
            inputFieldIcon={fullNameCheckOrError === 'Check' && <CheckIcon />}
            classInput={
              signUpForm.fullName ? styles.activeInput : styles.defaultInput
            }
            classSpan={
              signUpForm.fullName
                ? styles.activeInputSpan
                : styles.defaultInputSpan
            }
          />
          <InputField
            placeHolderText="Username"
            name="username"
            onChange={handleChange}
            withButton={false}
            inputFieldIcon={usernameCheckOrError && usernameValidationIcon}
            classInput={
              signUpForm.username ? styles.activeInput : styles.defaultInput
            }
            classSpan={
              signUpForm.username
                ? styles.activeInputSpan
                : styles.defaultInputSpan
            }
          />
          <InputField
            placeHolderText="Password"
            type={inputType}
            name="password"
            onChange={handleChange}
            onClick={() => setShowPass(!showPass)}
            btnText={buttonText}
            withButton
            inputFieldIcon={passwordCheckOrError === 'Check' && <CheckIcon />}
            classInput={
              signUpForm.password ? styles.activeInput : styles.defaultInput
            }
            classSpan={
              signUpForm.password
                ? styles.activeInputSpan
                : styles.defaultInputSpan
            }
          />
          <Button
            type="submit"
            disabled={checkDisabled()}
            isLoading={loading}
            btnRole="primary btnBlock"
          >
            Sign Up
          </Button>
          {signUpAlert && <Alert>{signUpAlert}</Alert>}
        </form>
      </div>
      <AuthSwitch
        hasAccountText="Have an account?"
        linkText="Log in"
        onClick={() => setSignUpAlert('')}
      />
    </div>
  );
};

export default SignUpForm;
