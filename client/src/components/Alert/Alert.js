import React from 'react';
import styles from './Alert.module.scss';

const Alert = ({ alerts }) => (
  <div className={styles.msgDiv}>
    <p>{alerts}</p>
  </div>
);

export default Alert;
