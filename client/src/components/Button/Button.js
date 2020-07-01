import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/Button/Button.module.scss';

const Button = ({ text, disabled, btnRole = '' }) => {
  const classes = btnRole
    .split(' ')
    .map((btnClass) => styles[btnClass])
    .join(' ');

  return (
    <div className={`${styles.btn} ${classes}`}>
      <button type="submit" disabled={disabled}>
        {text}
      </button>
    </div>
  );
};

Button.defaultProps = {
  btnRole: ''
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.func.isRequired,
  btnRole: PropTypes.string
};

export default Button;
