import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import styles from 'components/Button/Button.module.scss';

const Button = ({ text, spinner, btnRole = '', ...otherProps }) => {
  const classes = btnRole
    .split(' ')
    .map((btnClass) => styles[btnClass])
    .join(' ');

  return (
    <div className={`${styles.btn} ${classes}`}>
      <button type="submit" {...otherProps}>
        {spinner ? <LoadingSpinner /> : text}
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
