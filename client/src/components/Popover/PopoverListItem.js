import React from 'react';
import PropTypes from 'prop-types';
import styles from './PopoverListItem.module.scss';

const PopoverListItem = ({ children }) => (
  <li className={styles.listItem}>{children}</li>
);

PopoverListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default PopoverListItem;
