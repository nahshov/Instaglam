import React from 'react';
import PropTypes from 'prop-types';
import styles from './PopoverListItem.module.scss';

const PopoverListItem = ({ children, style = {} }) => {
  return (
    <li style={style} className={styles.listItem}>
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
