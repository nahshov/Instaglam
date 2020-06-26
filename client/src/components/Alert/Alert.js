import React from 'react';
import styles from './Alert.module.scss';

const Alert = ({ alerts }) => (
  // alerts.length > 0 && alerts
  <div className={styles.msgDiv}>
    <p>{alerts}</p>
  </div>
);

export default Alert;
