import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/Button/Button.module.scss';

const Button = ({ text, checkDisabled }) => (
  <div className={styles.authBtnDiv}>
    <button type="submit" disabled={checkDisabled}>
      {text}
    </button>
  </div>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  checkDisabled: PropTypes.func.isRequired
};

export default Button;
