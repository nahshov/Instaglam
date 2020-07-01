import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import styles from 'components/Button/Button.module.scss';

const Button = ({ text, disabled, spinner }) => {
  const {
    auth: { loading, isAuthenticated }
  } = useSelector((state) => state);

  return (
    <div className={styles.authBtnDiv}>
      <button type="submit" disabled={disabled}>
        {spinner ? <LoadingSpinner /> : text}
      </button>
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.func.isRequired
};

export default Button;
