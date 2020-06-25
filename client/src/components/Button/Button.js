import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/Button/Button.module.scss';

const Button = ({ text, disabled }) => (
  <div className={styles.authBtnDiv}>
    <button type="submit" disabled={disabled}>
      {text}
    </button>
  </div>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.func.isRequired
};

export default Button;
