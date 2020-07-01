/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Popover.module.scss';

const Popover = ({ isPopoverOpen, children }) =>
  isPopoverOpen && (
    <div className={styles.Popover}>
      <div className={styles.triangle} />
      <div className={styles.content}>{children}</div>
    </div>
  );

Popover.propTypes = {
  isPopoverOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Popover;
