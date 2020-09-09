import React from 'react';
import PropTypes from 'prop-types';
import styles from './Popover.module.scss';

const Popover = ({ isPopoverOpen,
  children,
  isActivityFeed = false,
  hideTriangle = false,
  ...otherProps
}) => isPopoverOpen && (
<div
  className={isActivityFeed ? styles.activityFeed : styles.Popover}
  {...otherProps}
>
  {!hideTriangle
  && <div className={styles.triangle} style={isActivityFeed ? { left: '94%' } : {}} />}
  <div className={styles.content}>{children}</div>
</div>
);

Popover.defaultProps = {
  isActivityFeed: false,
  hideTriangle: false
};

Popover.propTypes = {
  isPopoverOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isActivityFeed: PropTypes.bool,
  hideTriangle: PropTypes.bool
};

export default Popover;
