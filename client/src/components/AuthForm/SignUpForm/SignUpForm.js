import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import AuthHeader from 'components/AuthForm/AuthHeader/AuthHeader';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import Alert from 'components/Alert/Alert';
import AuthSwitch from 'components/AuthForm/AuthSwitch/AuthSwitch';
import ErrorIcon from 'components/Icons/ErrorIcon/ErrorIcon';
import CheckIcon from 'components/Icons/CheckIcon/CheckIcon';
import { register } from 'actions/auth';
import { setAlert } from 'actions/alert';
import styles from './SignUpForm.module.scss';

const SignUpForm = () => {
  const [hasAccount] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    fullName: '',
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const {
    auth: { isAuthenticated, loading },
    alert
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const checkDisabled = () => {
    const result = Object.values(signUpForm).filter((value) => value !== '');
    return result.length < 4 || signUpForm.password.length < 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(signUpForm.email)) {
      dispatch(setAlert('Enter a valid email address.', 'Error'));
    } else if (signUpForm.password.length < 6 || signUpForm.password === '') {
      dispatch(setAlert('Create a password at least 6 characters long.'));
    } else if (signUpForm.fullName === '' || signUpForm.username === '') {
      dispatch(setAlert('Full Name/Username are required fields'));
    } else {
      setIsLoading(true);
      dispatch(register(signUpForm));
      dispatch(setAlert('', null));
    }
  };
  if (isAuthenticated) {
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
            withButton={false}
            icon={<ErrorIcon />}
            classInput={
              signUpForm.email !== '' ? styles.activeInput : styles.defaultInput
            }
            classSpan={
              signUpForm.email !== ''
                ? styles.activeInputSpan
                : styles.defaultInputSpan
            }
          />
          <InputField
            text="Full Name"
            name="fullName"
            onChange={handleChange}
            withButton={false}
            icon={<CheckIcon />}
            classInput={
              signUpForm.fullName !== ''
                ? styles.activeInput
                : styles.defaultInput
            }
            classSpan={
              signUpForm.fullName !== ''
                ? styles.activeInputSpan
                : styles.defaultInputSpan
            }
          />
          <InputField
            text="Username"
            name="username"
            onChange={handleChange}
            withButton={false}
            icon={<ErrorIcon />}
            classInput={
              signUpForm.username !== ''
                ? styles.activeInput
                : styles.defaultInput
            }
            classSpan={
              signUpForm.username !== ''
                ? styles.activeInputSpan
                : styles.defaultInputSpan
            }
          />
          <InputField
            text="Password"
            type={inputType}
            name="password"
            onChange={handleChange}
            onClick={() => setShowPass(!showPass)}
            content={buttonText}
            withButton
            icon={<CheckIcon />}
            classInput={
              signUpForm.password !== ''
                ? styles.activeInput
                : styles.defaultInput
            }
            classSpan={
              signUpForm.password !== ''
                ? styles.activeInputSpan
                : styles.defaultInputSpan
            }
          />
          <Button
            text="Sign Up"
            disabled={checkDisabled()}
            isLoading={!loading ? false : isLoading}
            btnRole="primary btnBlock"
          />
          {alert.message === '' ? null : <Alert alerts={alert.message} />}
        </form>
      </div>
      <AuthSwitch hasAccountText="Have an account?" linkText="Log in" />
    </div>
  );
};

export default SignUpForm;
