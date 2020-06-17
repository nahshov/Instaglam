import React from 'react';
import styles from '../AuthForm.module.scss';
import AuthHeader from '../AuthHeader/AuthHeader';
import InputField from '../../../InputField/InputField';
import Button from '../../../Button/Button';
import AuthSwitch from '../AuthSwitch/AuthSwitch';

const LogInForm = ({ hasAccount, setHasAccount, disabled, form, setForm }) => {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.authWrapper}>
      <div className={styles.authDiv}>
        <AuthHeader hasAccount={hasAccount} />
        <form className={styles.authForm}>
          <InputField text={'Phone number, username, or email'} />
          <InputField text={'Password'} type={'password'} />
          <Button text={'Log In'} disable={disabled} />
        </form>
      </div>
      <AuthSwitch
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        hasAccountText={"Don't have an account?"}
        linkText={'Sign up'}
      />
    </div>
  );
};

export default LogInForm;
