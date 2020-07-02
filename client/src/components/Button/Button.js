import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import styles from 'components/Button/Button.module.scss';

const Button = ({ text, isLoading = false, btnRole = '', ...otherProps }) => {
  const classes = btnRole
    .split(' ')
    .map((btnClass) => styles[btnClass])
    .join(' ');

  return (
    <div className={`${styles.btn} ${classes}`}>
      <button type="submit" {...otherProps}>
        {isLoading ? <LoadingSpinner /> : text}
      </button>
    </div>
  );
};

Button.defaultProps = {
  btnRole: '',
  isLoading: false,
  disabled: false
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  btnRole: PropTypes.string,
  isLoading: PropTypes.bool
};

export default Button;
