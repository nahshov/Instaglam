import React from 'react';
import PropTypes from 'prop-types';
import styles from './Popover.module.scss';

const Popover = (props) => (
  <div className={styles.wrapper}>
    <div className={styles.text}>I popup!!</div>
  </div>
);

Popover.propTypes = {};

export default Popover;
