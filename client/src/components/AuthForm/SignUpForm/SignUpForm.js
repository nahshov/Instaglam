/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from 'pages/AuthPage/AuthPage.module.scss';
import AuthHeader from 'components/AuthForm/AuthHeader/AuthHeader';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import AuthSwitch from 'components/AuthForm/AuthSwitch/AuthSwitch';
import ErrorIcon from 'components/Icons/ErrorIcon/ErrorIcon';
import CheckIcon from 'components/Icons/CheckIcon/CheckIcon';
import RefreshIcon from 'components/Icons/RefreshIcon/RefreshIcon';
import { register } from 'actions/auth';

const SignUpForm = ({ showPass, setShowPass, register, isAuthenticated }) => {
  const [hasAccount] = useState(true);
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
    const result = Object.values(signUpForm).filter((value) => value !== '');
    return result.length < 4 || signUpForm.password.length < 6;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      register(signUpForm);
    } catch (error) {
      // @roiassa @TODO: make this appear as a jsx element in alert colors
      console.error(error);
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
            withButton
            icon={<ErrorIcon />}
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
          />
          <Button text="Sign Up" disabled={checkDisabled()} />
        </form>
      </div>
      <AuthSwitch hasAccountText="Have an account?" linkText="Log in" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

SignUpForm.propTypes = {
  showPass: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { register })(SignUpForm);
