import React from 'react';
import PropTypes from 'prop-types';
import styles from './Alert.module.scss';

const Alert = ({ alerts }) => (
  <div className={styles.msgDiv}>
    <p>{alerts}</p>
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.string.isRequired
};

export default Alert;
