import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isEmail } from 'validator';
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
  const [emailIcon, setEmailIcon] = useState('');
  const [fullNameIcon, setFullNameIcon] = useState('');
  const [usernameIcon, setUsernameIcon] = useState('');
  const [passwordIcon, setPasswordIcon] = useState('');
  const {
    auth: { isAuthenticated, loading },
    alert
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const checkDisabled = () => Object.values(signUpForm).some(
    (value) => !value || signUpForm.password.length < 6
  );

  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
    if (!isEmail(signUpForm.email)) {
      setEmailIcon('Error');
    } else {
      setEmailIcon('Check');
    }

    if (signUpForm.fullName) {
      setFullNameIcon('Check');
    } else {
      setFullNameIcon('');
    }

    if (signUpForm.username.length) {
      setUsernameIcon('Check');
    } else {
      setUsernameIcon('');
    }

    if (signUpForm.password.length > 6) {
      setPasswordIcon('Check');
    } else {
      setPasswordIcon('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmail(signUpForm.email)) {
      dispatch(setAlert('Enter a valid email address.', 'Error'));
    } else if (signUpForm.password.length < 6) {
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
  const whichEmailIcon = alert.message !== `Another account is using ${signUpForm.email}`
    && emailIcon === 'Check' ? (
      <CheckIcon />
    ) : (
      <ErrorIcon />
    );
  const whichUsernameIcon = alert.message !== "This username isn't available. Please try another."
    && usernameIcon === 'Check' ? (
      <CheckIcon />
    ) : (
      <ErrorIcon />
    );

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authDiv}>
        <AuthHeader hasAccount={hasAccount} />
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <InputField
            placeHolderText="Email"
            name="email"
            onChange={handleChange}
            withButton={false}
            inputFieldIcon={!emailIcon ? null : whichEmailIcon}
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
            inputFieldIcon={fullNameIcon === 'Check' ? <CheckIcon /> : null}
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
            inputFieldIcon={!usernameIcon ? null : whichUsernameIcon}
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
            inputFieldIcon={passwordIcon === 'Check' ? <CheckIcon /> : null}
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
            btnType="submit"
            text="Sign Up"
            disabled={checkDisabled()}
            isLoading={!loading ? false : isLoading}
            btnRole="primary btnBlock"
          />
          {alert.message && <Alert alerts={alert.message} />}
        </form>
      </div>
      <AuthSwitch hasAccountText="Have an account?" linkText="Log in" />
    </div>
  );
};

export default SignUpForm;
