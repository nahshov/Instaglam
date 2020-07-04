import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import styles from 'components/Button/Button.module.scss';

const Button = ({
  btnType = '',
  text,
  isLoading = false,
  btnRole = '',
  ...otherProps
}) => {
  const classes = btnRole
    .split(' ')
    .map((btnClass) => styles[btnClass])
    .join(' ');

  return (
    <div className={`${styles.btn} ${classes}`}>
      <button type={btnType} {...otherProps}>
        {isLoading ? <LoadingSpinner /> : text}
      </button>
    </div>
  );
};

Button.defaultProps = {
  btnType: '',
  btnRole: '',
  isLoading: false,
  disabled: false
};

Button.propTypes = {
  btnType: PropTypes.string,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  btnRole: PropTypes.string,
  isLoading: PropTypes.bool
};

export default Button;
