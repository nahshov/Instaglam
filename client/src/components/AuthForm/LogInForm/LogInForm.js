import React, { useState, useEffect } from 'react';
import styles from 'pages/AuthPage/AuthPage.module.scss';
import AuthHeader from 'components/AuthForm/AuthHeader/AuthHeader';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import AuthSwitch from 'components/AuthForm/AuthSwitch/AuthSwitch';

const LogInForm = ({
  history,
  hasAccount,
  setHasAccount,
  disabled,
  setDisabled,
  showPass,
  setShowPass
}) => {
  const [logInForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setLoginForm({ ...logInForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const result = Object.values(logInForm).filter((value) => value !== '');
    result.length < 2 || logInForm.password.length < 6
      ? setDisabled(true)
      : setDisabled(false);
  }, [logInForm, disabled]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(logInForm)
      });
      return res.status === 200 ? history.push('/') : Promise.reject();
    } catch {
      // @TODO: make this appear as a jsx element in alert colors
      throw new Error('Failed to log in');
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
            text="Phone number, username, or email"
            name="email"
            onChange={handleChange}
          />
          <InputField
            text="Password"
            type={inputType}
            name="password"
            onChange={handleChange}
            onClick={() => setShowPass(!showPass)}
            content={buttonText}
          />

          <Button text="Log In" disabled={disabled} />
        </form>
      </div>
      <AuthSwitch
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        hasAccountText={"Don't have an account?"}
        linkText="Sign up"
      />
    </div>
  );
};

export default LogInForm;
