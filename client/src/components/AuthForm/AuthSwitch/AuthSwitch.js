import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setFormAlert } from 'actions/alerts/alertActions';
import styles from 'components/AuthForm/AuthSwitch/AuthSwitch.module.scss';

const AuthSwitch = ({ hasAccountText, linkText }) => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (alert.message !== '') {
      dispatch(setFormAlert('', null));
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.paragraph}>
        <span>{hasAccountText}</span>
        {linkText === 'Sign up' ? (
          <Link
            className={styles.link}
            to="/accounts/emailsignup/"
            onClick={handleClick}
          >
            {linkText}
          </Link>
        ) : (
          <Link
            className={styles.link}
            to="/accounts/login/"
            onClick={handleClick}
          >
            {linkText}
          </Link>
        )}
      </p>
    </div>
  );
};

AuthSwitch.propTypes = {
  hasAccountText: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired
};

export default AuthSwitch;
