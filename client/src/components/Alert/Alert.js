import React from 'react';
import PropTypes from 'prop-types';
import styles from './Alert.module.scss';

const Alert = ({ children, ...otherProps }) => {
  return (
    <div className={styles.msgDiv} {...otherProps}>
      <p>{children}</p>
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Alert;
