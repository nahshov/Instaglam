/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import styles from 'components/Button/Button.module.scss';

const Button = ({
  children,
  isLoading = false,
  btnRole = '',
  ...otherProps
}) => {
  const classes = btnRole
    .split(' ')
    .map((btnClass) => { return styles[btnClass]; })
    .join(' ');
  return (
    <div className={`${styles.btn} ${classes}`}>
      <button {...otherProps}>
        {isLoading
          ? (
            <div className={styles.buttonLoadingSpinner}>
              <LoadingSpinner />
            </div>
          )
          : children}
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  disabled: PropTypes.bool,
  btnRole: PropTypes.string,
  isLoading: PropTypes.bool
};

export default Button;
