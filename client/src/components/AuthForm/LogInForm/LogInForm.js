import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from 'pages/AuthPage/AuthPage.module.scss';
import AuthHeader from 'components/AuthForm/AuthHeader/AuthHeader';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import AuthSwitch from 'components/AuthForm/AuthSwitch/AuthSwitch';
import { login } from 'actions/auth';

const LogInForm = ({
  showPass,
  setShowPass,
  login,
  isAuthenticated,
  loading
}) => {
  const [disabled, setDisabled] = useState(true);
  const [hasAccount, setHasAccount] = useState(false);

  const [logInForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const result = Object.values(logInForm).filter((value) => value !== '');
    setDisabled(result.length < 2 || logInForm.password.length < 5);
    // if (result.length < 2 || logInForm.password.length < 5) {
    //   setDisabled(true);
    // } else {
    //   setDisabled(false);
    // }
    setLoginForm({ ...logInForm, [e.target.name]: e.target.value });
  };

  // @roiassa I think this logic is more appropriate in the handle change ☝︎
  // useEffect(() => {
  //   const result = Object.values(logInForm).filter((value) => value !== '');
  //   result.length < 2 || logInForm.password.length < 6
  //     ? setDisabled(true)
  //     : setDisabled(false);
  // }, [logInForm, disabled]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      login(logInForm);
    } catch {
      // @TODO: make this appear as a jsx element in alert colors
      console.log('Failed to log in');
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
          <InputField text="Email" name="email" onChange={handleChange} />
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { login })(LogInForm);
