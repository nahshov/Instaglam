import React from 'react';
import PropTypes from 'prop-types';
import styles from './PopoverListItem.module.scss';

const PopoverListItem = ({ children, ...otherProps }) => {
  return (
    <li className={styles.listItem} {...otherProps}>
      {children}
    </li>
  );
};

PopoverListItem.defaultProps = {
  style: {}
};

PopoverListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  style: PropTypes.shape({})
};

export default PopoverListItem;
