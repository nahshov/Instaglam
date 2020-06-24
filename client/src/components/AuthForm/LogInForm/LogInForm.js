import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from 'pages/AuthPage/AuthPage.module.scss';
import AuthHeader from 'components/AuthForm/AuthHeader/AuthHeader';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import AuthSwitch from 'components/AuthForm/AuthSwitch/AuthSwitch';
import { login } from 'actions/auth';

const LogInForm = ({
  hasAccount,
  showPass,
  setShowPass,
  login,
  isAuthenticated,
  loading
}) => {
  const [logInForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const checkDisabled = () => {
    const result = Object.values(logInForm).filter((value) => {
      return value !== '';
    });
    return result.length < 2 || logInForm.password.length < 6;
  };

  const handleChange = (e) => {
    setLoginForm({ ...logInForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      login(logInForm);
    } catch {
      //@TODO: make error appear as a jsx element in error colors
      throw new Error('Failed to log in');
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
            withButton
            onClick={() => {
              setShowPass(!showPass);
            }}
            content={buttonText}
          />

          <Button text="Log In" disabled={checkDisabled()} />
        </form>
      </div>
      <AuthSwitch
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

LogInForm.propTypes = {
  showPass: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { login })(LogInForm);
