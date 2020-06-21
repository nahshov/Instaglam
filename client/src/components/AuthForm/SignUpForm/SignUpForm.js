import React, { useState } from 'react';
import styles from 'pages/AuthPage/AuthPage.module.scss';
import AuthHeader from 'components/AuthForm/AuthHeader/AuthHeader';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import AuthSwitch from 'components/AuthForm/AuthSwitch/AuthSwitch';
import ErrorIcon from 'components/Icons/ErrorIcon/ErrorIcon';
import CheckIcon from 'components/Icons/CheckIcon/CheckIcon';
import RefreshIcon from 'components/Icons/RefreshIcon/RefreshIcon';

const SignUpForm = ({
  history,
  hasAccount,
  setHasAccount,
  showPass,
  setShowPass
}) => {
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    fullName: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const checkDisabled = () => {
    const result = Object.values(signUpForm).filter((value) => {
      return value !== '';
    });
    return result.length < 4 || signUpForm.password.length < 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/register', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(signUpForm)
      });
      return res.status === 200 ? history.push('/') : Promise.reject();
    } catch {
      //@TODO: make this appear as a jsx element in alert colors
      throw new Error('Failed to sign up');
    }
  };

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
          />
          <InputField
            text="Full Name"
            name="fullName"
            onChange={handleChange}
            withButton={false}
            icon={<CheckIcon />}
          />
          <InputField
            text="Username"
            name="username"
            onChange={handleChange}
            content={<RefreshIcon />}
            withButton={true}
            icon={<ErrorIcon />}
          />
          <InputField
            text="Password"
            type={inputType}
            name="password"
            onChange={handleChange}
            onClick={() => setShowPass(!showPass)}
            content={buttonText}
            withButton={true}
            icon={<CheckIcon />}
          />
          <Button text={'Sign Up'} disabled={checkDisabled()} />
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
