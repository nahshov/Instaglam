import React from 'react';
import AuthHeader from '../AuthHeader/AuthHeader';
import InputField from '../../../InputField/InputField';
import Button from '../../../Button/Button';
import AuthSwitch from '../AuthSwitch/AuthSwitch';
import styles from '../AuthForm.module.scss';

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
