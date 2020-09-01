import React from 'react';
import PropTypes from 'prop-types';
import styles from './Popover.module.scss';

const Popover = ({ isPopoverOpen, children, isActivityFeed, ...otherProps }) => isPopoverOpen && (
<div className={styles.Popover} {...otherProps}>
  <div className={styles.triangle} style={isActivityFeed && { left: 'initial', right: '6%' }} />
  <div className={styles.content}>{children}</div>
</div>
);

Popover.propTypes = {
  isPopoverOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isActivityFeed: PropTypes.bool.isRequired
};

export default Popover;
