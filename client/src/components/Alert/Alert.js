import React from 'react';
import PropTypes from 'prop-types';
import styles from './Alert.module.scss';

const Alert = ({ children, ...otherProps }) => (
  <div className={styles.msgDiv} {...otherProps}>
    <p>{children}</p>
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.string.isRequired
};

export default Alert;
