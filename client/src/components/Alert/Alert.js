import React from 'react';
import PropTypes from 'prop-types';
import styles from './Alert.module.scss';

const Alert = ({ alert, ...otherProps }) => (
  <div className={styles.msgDiv} {...otherProps}>
    <p>{alert}</p>
  </div>
);

Alert.propTypes = {
  alert: PropTypes.string.isRequired
};

export default Alert;
