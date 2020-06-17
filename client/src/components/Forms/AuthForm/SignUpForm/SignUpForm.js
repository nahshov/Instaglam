import React from 'react';
import styles from '../AuthForm.module.scss';
import AuthHeader from 'components/Forms/AuthForm/AuthHeader/AuthHeader';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import AuthSwitch from 'components/Forms/AuthForm/AuthSwitch/AuthSwitch';

const SignUpForm = ({ hasAccount, setHasAccount, disabled, form, setForm }) => {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authDiv}>
        <AuthHeader hasAccount={hasAccount} />
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <InputField
            text={'Mobile Number or Email'}
            name={'phoneOrEmail'}
            onChange={handleChange}
          />
          <InputField
            text={'Full Name'}
            name={'fullName'}
            onChange={handleChange}
          />
          <InputField
            text={'Username'}
            name={'userName'}
            onChange={handleChange}
          />
          <InputField
            text={'Password'}
            type={'password'}
            name={'password'}
            onChange={handleChange}
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
