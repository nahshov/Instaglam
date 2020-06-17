import React, { useState, useEffect } from 'react';
import styles from 'components/Forms/AuthForm/AuthForm.module.scss';
import AuthHeader from 'components/Forms/AuthForm/AuthHeader/AuthHeader';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import AuthSwitch from 'components/Forms/AuthForm/AuthSwitch/AuthSwitch';
import ErrorIcon from 'components/Icons/ErrorIcon/ErrorIcon';
import CheckIcon from 'components/Icons/CheckIcon/CheckIcon';
import RefreshIcon from 'components/Icons/RefreshIcon/RefreshIcon';

const SignUpForm = ({
  hasAccount,
  setHasAccount,
  disabled,
  setDisabled,
  showPass,
  setShowPass
}) => {
  const [signUpForm, setSignUpForm] = useState({
    phoneOrEmail: '',
    fullName: '',
    userName: '',
    password: ''
  });

  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const result = Object.values(signUpForm).filter((value) => {
      return value !== '';
    });
    result.length < 4 || signUpForm.password.length < 6
      ? setDisabled(true)
      : setDisabled(false);
  }, [signUpForm, disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signUpForm);
  };

  const inputType = showPass ? 'text' : 'password';
  const buttonText = showPass ? 'Hide' : 'Show';

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authDiv}>
        <AuthHeader hasAccount={hasAccount} />
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <InputField
            text={'Mobile Number or Email'}
            name={'phoneOrEmail'}
            onChange={handleChange}
            icon={<ErrorIcon />}
          />
          <InputField
            text={'Full Name'}
            name={'fullName'}
            onChange={handleChange}
            icon={<CheckIcon />}
          />
          <InputField
            text={'Username'}
            name={'userName'}
            onChange={handleChange}
            content={<RefreshIcon />}
            icon={<ErrorIcon />}
          />
          <InputField
            text={'Password'}
            type={inputType}
            name={'password'}
            onChange={handleChange}
            onClick={() => setShowPass(!showPass)}
            content={buttonText}
            icon={<CheckIcon />}
          />
          <Button text={'Sign Up'} disabled={disabled} />
        </form>
      </div>
      <AuthSwitch
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        hasAccountText={'Have an account?'}
        linkText={'Log in'}
      />
    </div>
  );
};

export default SignUpForm;
