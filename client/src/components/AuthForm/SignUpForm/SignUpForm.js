import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import validator from 'validator';
import AuthHeader from 'components/AuthForm/AuthHeader/AuthHeader';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import Alert from 'components/Alert/Alert';
import AuthSwitch from 'components/AuthForm/AuthSwitch/AuthSwitch';
import ErrorIcon from 'components/Icons/ErrorIcon/ErrorIcon';
import CheckIcon from 'components/Icons/CheckIcon/CheckIcon';
import RefreshIcon from 'components/Icons/RefreshIcon/RefreshIcon';
import { register as registerAction } from 'actions/auth';
import { setAlert as setAlertAction } from 'actions/alert';
import styles from './SignUpForm.module.scss';

const SignUpForm = ({
  register,
  auth: { isAuthenticated, loading },
  alert,
  setAlert
}) => {
  const [hasAccount] = useState(true);
  const [showPass, setShowPass] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(signUpForm.email)) {
      setAlert('Please include a valid email', 'Error');
    } else {
      register(signUpForm);
      setAlert('', null);
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
          {alert.message === '' ? null : <Alert alerts={alert.message} />}
        </form>
      </div>
      <AuthSwitch hasAccountText="Have an account?" linkText="Log in" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  alert: state.alert
});

SignUpForm.propTypes = {
  register: PropTypes.func.isRequired,
  alert: PropTypes.shape({
    message: PropTypes.string.isRequired,
    alertType: PropTypes.string.isRequired
  }).isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
  }).isRequired
};

export default connect(mapStateToProps, {
  register: registerAction,
  setAlert: setAlertAction
})(SignUpForm);
